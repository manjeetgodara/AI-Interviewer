from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config import settings

engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def apply_schema_updates() -> None:
    """Apply lightweight column changes that create_all cannot handle."""
    inspector = inspect(engine)
    if "users" not in inspector.get_table_names():
        return

    columns = {column["name"] for column in inspector.get_columns("users")}
    with engine.begin() as conn:
        if "full_name" in columns:
            conn.execute(text("ALTER TABLE users DROP COLUMN full_name"))
        if "avatar" not in columns:
            conn.execute(
                text(
                    "ALTER TABLE users "
                    "ADD COLUMN avatar VARCHAR(32) NOT NULL DEFAULT 'coral'"
                )
            )


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
