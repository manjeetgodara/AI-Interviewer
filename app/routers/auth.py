import secrets
import urllib.parse

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.auth import create_access_token, get_current_user, hash_password, verify_password
from app.config import settings
from app.database import get_db
from app.models import User
from app.oauth import (
    exchange_google_code,
    google_authorize_url,
    make_oauth_state,
    parse_oauth_state,
    sanitize_redirect,
)
from app.schemas import AuthResponse, SignInRequest, SignUpRequest, UserOut

router = APIRouter(prefix="/api/auth", tags=["auth"])


def _auth_response(user: User) -> AuthResponse:
    return AuthResponse(
        user=UserOut.model_validate(user),
        token=create_access_token(user.id, user.email),
    )


def _frontend_redirect(path: str, params: dict[str, str]) -> RedirectResponse:
    query = urllib.parse.urlencode(params)
    base = settings.frontend_origin.rstrip("/")
    url = f"{base}{path}"
    if query:
        url = f"{url}?{query}"
    return RedirectResponse(url=url, status_code=status.HTTP_302_FOUND)


def _oauth_callback_uri(provider: str) -> str:
    return f"{settings.api_public_origin.rstrip('/')}/api/auth/oauth/{provider}/callback"


def _get_or_create_oauth_user(db: Session, *, email: str) -> User:
    user = db.query(User).filter(User.email == email).first()
    if user is not None:
        return user

    user = User(
        email=email,
        password_hash=hash_password(secrets.token_urlsafe(32)),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post(
    "/signup",
    response_model=AuthResponse,
    response_model_by_alias=True,
    status_code=status.HTTP_201_CREATED,
)
def signup(body: SignUpRequest, db: Session = Depends(get_db)):
    email = body.email.lower().strip()
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists",
        )

    user = User(
        email=email,
        password_hash=hash_password(body.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return _auth_response(user)


@router.post("/signin", response_model=AuthResponse, response_model_by_alias=True)
def signin(body: SignInRequest, db: Session = Depends(get_db)):
    email = body.email.lower().strip()
    user = db.query(User).filter(User.email == email).first()
    if user is None or not verify_password(body.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    return _auth_response(user)


@router.get("/me")
def me(current_user: User = Depends(get_current_user)):
    return {"user": UserOut.model_validate(current_user).model_dump(by_alias=True)}


@router.get("/oauth/{provider}")
def oauth_start(provider: str, redirect: str = "/"):
    provider = provider.lower().strip()
    safe_redirect = sanitize_redirect(redirect)

    if provider != "google":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Unsupported OAuth provider",
        )

    if not settings.google_client_id or not settings.google_client_secret:
        return _frontend_redirect(
            "/signup",
            {
                "error": "Google sign-up is not configured yet. Please continue with email.",
                "from": safe_redirect,
            },
        )

    state = make_oauth_state(safe_redirect)
    return RedirectResponse(
        url=google_authorize_url(state, _oauth_callback_uri("google")),
        status_code=status.HTTP_302_FOUND,
    )


@router.get("/oauth/{provider}/callback")
def oauth_callback(
    provider: str,
    db: Session = Depends(get_db),
    code: str | None = None,
    state: str | None = None,
    error: str | None = None,
    error_description: str | None = None,
):
    provider = provider.lower().strip()
    fallback_redirect = "/"

    if error:
        message = error_description or error or "Social sign-in was cancelled"
        return _frontend_redirect(
            "/signup",
            {"error": message, "from": fallback_redirect},
        )

    if not code or not state:
        return _frontend_redirect(
            "/signup",
            {
                "error": "Social sign-in failed. Please try again.",
                "from": fallback_redirect,
            },
        )

    try:
        redirect_to = parse_oauth_state(state)
        callback_uri = _oauth_callback_uri(provider)

        if provider != "google":
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Unsupported OAuth provider",
            )

        profile = exchange_google_code(code, callback_uri)

        user = _get_or_create_oauth_user(db, email=profile["email"])
        auth = _auth_response(user)
        return _frontend_redirect(
            "/oauth/callback",
            {
                "token": auth.token,
                "redirect": redirect_to,
            },
        )
    except HTTPException as exc:
        return _frontend_redirect(
            "/signup",
            {
                "error": str(exc.detail),
                "from": fallback_redirect,
            },
        )
    except Exception:
        return _frontend_redirect(
            "/signup",
            {
                "error": "Social sign-in failed. Please try again.",
                "from": fallback_redirect,
            },
        )
