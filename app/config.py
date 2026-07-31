from pathlib import Path
from urllib.parse import quote_plus

from pydantic_settings import BaseSettings, SettingsConfigDict

_ENV_FILE = Path(__file__).resolve().parent.parent / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=_ENV_FILE,
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    port: int = 5000

    postgres_user: str = "postgres"
    postgres_password: str = "postgres"
    postgres_db: str = "meera"
    postgres_host: str = "localhost"
    postgres_port: int = 5432

    jwt_secret: str = "change-me"
    jwt_expires_minutes: int = 60 * 24 * 7
    frontend_origin: str = "http://localhost:5173"
    api_public_origin: str = "http://localhost:5000"
    jwt_algorithm: str = "HS256"

    google_client_id: str = ""
    google_client_secret: str = ""

    @property
    def database_url(self) -> str:
        user = quote_plus(self.postgres_user)
        password = quote_plus(self.postgres_password)
        return (
            f"postgresql://{user}:{password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )


settings = Settings()
