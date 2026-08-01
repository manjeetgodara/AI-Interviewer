from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field, field_validator

ALLOWED_AVATARS = frozenset(
    {"coral", "amber", "lime", "sky", "indigo", "rose", "teal", "slate"}
)
DEFAULT_AVATAR = "coral"


def _normalize_avatar(value: str) -> str:
    avatar = value.strip().lower()
    if avatar not in ALLOWED_AVATARS:
        raise ValueError("Invalid avatar selection")
    return avatar


class SignUpRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    avatar: str = Field(default=DEFAULT_AVATAR, min_length=1, max_length=32)

    @field_validator("password")
    @classmethod
    def password_strength(cls, value: str) -> str:
        if not any(c.isalpha() for c in value):
            raise ValueError("Password must include a letter")
        if not any(c.isdigit() for c in value):
            raise ValueError("Password must include a number")
        return value

    @field_validator("avatar")
    @classmethod
    def validate_avatar(cls, value: str) -> str:
        return _normalize_avatar(value)


class SignInRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)


class UpdateAvatarRequest(BaseModel):
    avatar: str = Field(..., min_length=1, max_length=32)

    @field_validator("avatar")
    @classmethod
    def validate_avatar(cls, value: str) -> str:
        return _normalize_avatar(value)


class UserOut(BaseModel):
    id: UUID
    email: EmailStr
    avatar: str = DEFAULT_AVATAR
    created_at: datetime = Field(serialization_alias="createdAt")

    model_config = {"from_attributes": True, "populate_by_name": True}


class AuthResponse(BaseModel):
    user: UserOut
    token: str


class InterviewSetupResponse(BaseModel):
    role: str
    github_url: str = Field("", serialization_alias="githubUrl")
    resume_name: str = Field(..., serialization_alias="resumeName")
    text_path: str = Field(..., serialization_alias="textPath")

    model_config = {"populate_by_name": True}
