"""Application configuration loaded from environment variables."""

import sys
from enum import StrEnum

from pydantic import Field, ValidationError
from pydantic_settings import BaseSettings


class Environment(StrEnum):
    LOCAL = "local"
    STAGING = "staging"
    PRODUCTION = "production"


class Settings(BaseSettings):
    """Typed settings — validates at startup, crashes on missing required values."""

    environment: Environment = Field(default=Environment.LOCAL, alias="ENVIRONMENT")
    debug: bool = Field(default=False, alias="DEBUG")
    app_name: str = Field(default="Starter API", alias="APP_NAME")
    host: str = Field(default="127.0.0.1", alias="HOST")
    port: int = Field(default=8000, alias="PORT")

    # Add required secrets here (no default = required):
    # api_key: str = Field(alias="API_KEY")

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }


try:
    settings = Settings()
except ValidationError as e:
    print("=" * 60)  # noqa: T201
    print("CONFIGURATION ERROR")  # noqa: T201
    print("=" * 60)  # noqa: T201
    for error in e.errors():
        field = error["loc"][0]
        print(f"  - {field}: {error['msg']}")  # noqa: T201
    print("\nCheck your .env file or environment variables.")  # noqa: T201
    sys.exit(1)
