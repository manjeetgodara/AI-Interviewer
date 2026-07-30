from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field, field_validator


class SignUpRequest(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100, alias="fullName")
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)

    model_config = {"populate_by_name": True}

    @field_validator("password")
    @classmethod
    def password_strength(cls, value: str) -> str:
        if not any(c.isalpha() for c in value):
            raise ValueError("Password must include a letter")
        if not any(c.isdigit() for c in value):
            raise ValueError("Password must include a number")
        return value


class SignInRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)


class UserOut(BaseModel):
    id: UUID
    full_name: str = Field(serialization_alias="fullName")
    email: EmailStr
    created_at: datetime = Field(serialization_alias="createdAt")

    model_config = {"from_attributes": True, "populate_by_name": True}


class AuthResponse(BaseModel):
    user: UserOut
    token: str
