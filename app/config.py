from urllib.parse import quote_plus

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    port: int = 5000

    postgres_user: str = "postgres"
    postgres_password: str = "postgres"
    postgres_db: str = "meera"
    postgres_host: str = "localhost"
    postgres_port: int = 5432

    jwt_secret: str = "change-me"
    jwt_expires_minutes: int = 60 * 24 * 7
    frontend_origin: str = "http://localhost:5173"
    jwt_algorithm: str = "HS256"

    @property
    def database_url(self) -> str:
        user = quote_plus(self.postgres_user)
        password = quote_plus(self.postgres_password)
        return (
            f"postgresql://{user}:{password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )


settings = Settings()
