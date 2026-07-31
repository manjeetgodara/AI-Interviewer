from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from uuid import UUID

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status

from app.auth import get_current_user
from app.models import User
from app.schemas import InterviewSetupResponse
from app.services.resume_parser import (
    MAX_RESUME_BYTES,
    ResumeParseError,
    parse_resume_bytes,
    safe_stem,
    validate_resume_filename,
)

router = APIRouter(prefix="/api/interview", tags=["interview"])

OUTPUT_DIR = Path(__file__).resolve().parent.parent.parent / "output"


def ensure_output_dir() -> Path:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    return OUTPUT_DIR


@router.post(
    "/setup",
    response_model=InterviewSetupResponse,
    response_model_by_alias=True,
)
async def setup_interview(
    resume: UploadFile = File(...),
    role: str = Form(...),
    githubUrl: str = Form(""),
    current_user: User = Depends(get_current_user),
):
    resolved_role = role.strip()
    if not resolved_role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Interview role is required",
        )

    filename = resume.filename or "resume.pdf"
    try:
        validate_resume_filename(filename)
    except ResumeParseError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    data = await resume.read()
    if len(data) > MAX_RESUME_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Resume must be 5 MB or smaller",
        )

    try:
        text = parse_resume_bytes(data, filename)
    except ResumeParseError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    text_path = _write_resume_text(current_user.id, filename, text)

    return InterviewSetupResponse(
        role=resolved_role,
        github_url=githubUrl.strip(),
        resume_name=filename,
        text_path=str(text_path.as_posix()),
    )


def _write_resume_text(user_id: UUID, filename: str, text: str) -> Path:
    output_dir = ensure_output_dir()
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    out_name = f"{user_id}_{stamp}_{safe_stem(filename)}.txt"
    path = output_dir / out_name
    path.write_text(text, encoding="utf-8")
    return path
