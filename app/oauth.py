import base64
import hashlib
import hmac
import json
import secrets
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

from fastapi import HTTPException, status

from app.config import settings
from app.schemas import ALLOWED_AVATARS, DEFAULT_AVATAR

OAUTH_STATE_MAX_AGE_SECONDS = 60 * 10


def _b64url_encode(raw: bytes) -> str:
    return base64.urlsafe_b64encode(raw).decode().rstrip("=")


def _b64url_decode(value: str) -> bytes:
    padding = "=" * (-len(value) % 4)
    return base64.urlsafe_b64decode(value + padding)


def sanitize_avatar(avatar: str | None) -> str:
    if not avatar:
        return DEFAULT_AVATAR
    normalized = avatar.strip().lower()
    if normalized not in ALLOWED_AVATARS:
        return DEFAULT_AVATAR
    return normalized


def make_oauth_state(redirect: str, avatar: str = DEFAULT_AVATAR) -> str:
    payload = {
        "r": redirect,
        "a": sanitize_avatar(avatar),
        "t": int(time.time()),
        "n": secrets.token_hex(8),
    }
    raw = _b64url_encode(json.dumps(payload, separators=(",", ":")).encode())
    sig = hmac.new(
        settings.jwt_secret.encode(),
        raw.encode(),
        hashlib.sha256,
    ).hexdigest()[:32]
    return f"{raw}.{sig}"


def parse_oauth_state(state: str) -> tuple[str, str]:
    try:
        raw, sig = state.split(".", 1)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OAuth state",
        ) from exc

    expected = hmac.new(
        settings.jwt_secret.encode(),
        raw.encode(),
        hashlib.sha256,
    ).hexdigest()[:32]
    if not hmac.compare_digest(sig, expected):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OAuth state signature",
        )

    try:
        payload = json.loads(_b64url_decode(raw))
    except (json.JSONDecodeError, ValueError) as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OAuth state payload",
        ) from exc

    issued_at = int(payload.get("t", 0))
    if abs(time.time() - issued_at) > OAUTH_STATE_MAX_AGE_SECONDS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OAuth state expired. Please try again.",
        )

    redirect = payload.get("r", "/")
    if not isinstance(redirect, str) or not redirect.startswith("/") or redirect.startswith("//"):
        redirect = "/"

    avatar = sanitize_avatar(payload.get("a") if isinstance(payload.get("a"), str) else None)
    return redirect, avatar


def sanitize_redirect(redirect: str | None) -> str:
    if not redirect or not redirect.startswith("/") or redirect.startswith("//"):
        return "/"
    return redirect


def _http_json(
    url: str,
    *,
    method: str = "GET",
    data: dict[str, str] | None = None,
    headers: dict[str, str] | None = None,
) -> dict[str, Any]:
    body = None
    req_headers = {"Accept": "application/json", **(headers or {})}
    if data is not None:
        body = urllib.parse.urlencode(data).encode()
        req_headers.setdefault("Content-Type", "application/x-www-form-urlencoded")

    request = urllib.request.Request(url, data=body, headers=req_headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            return json.loads(response.read().decode())
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode(errors="ignore")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"OAuth provider request failed: {detail or exc.reason}",
        ) from exc
    except urllib.error.URLError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Could not reach OAuth provider",
        ) from exc


def google_authorize_url(state: str, redirect_uri: str) -> str:
    params = {
        "client_id": settings.google_client_id,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": "openid email profile",
        "state": state,
        "access_type": "online",
        "prompt": "select_account",
    }
    return f"https://accounts.google.com/o/oauth2/v2/auth?{urllib.parse.urlencode(params)}"


def exchange_google_code(code: str, redirect_uri: str) -> dict[str, str]:
    token = _http_json(
        "https://oauth2.googleapis.com/token",
        method="POST",
        data={
            "code": code,
            "client_id": settings.google_client_id,
            "client_secret": settings.google_client_secret,
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code",
        },
    )
    access_token = token.get("access_token")
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Google did not return an access token",
        )

    profile = _http_json(
        "https://openidconnect.googleapis.com/v1/userinfo",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    email = (profile.get("email") or "").strip().lower()
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google account email is required",
        )

    return {"email": email}
