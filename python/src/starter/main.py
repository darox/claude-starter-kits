"""Starter FastAPI application."""

import logging

from fastapi import FastAPI

from starter.config import settings
from starter.schemas import ErrorResponse, HealthResponse, MessageResponse

logging.basicConfig(
    level=logging.DEBUG if settings.debug else logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s — %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    responses={422: {"model": ErrorResponse}},
)


@app.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    """Health check endpoint."""
    return HealthResponse(status="ok", environment=settings.environment.value)


@app.get("/", response_model=MessageResponse)
async def root() -> MessageResponse:
    """Root endpoint."""
    return MessageResponse(message=f"Hello from {settings.app_name}")
