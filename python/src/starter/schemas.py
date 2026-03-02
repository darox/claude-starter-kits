"""API response schemas."""

from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    environment: str


class MessageResponse(BaseModel):
    message: str


class ErrorResponse(BaseModel):
    detail: str
