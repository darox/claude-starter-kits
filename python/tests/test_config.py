"""Tests for configuration."""

from starter.config import Environment, settings


def test_default_environment() -> None:
    """Default environment is local."""
    assert settings.environment == Environment.LOCAL


def test_default_debug_off() -> None:
    """Debug is off by default."""
    assert settings.debug is False
