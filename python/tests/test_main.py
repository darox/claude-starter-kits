"""Tests for starter API endpoints."""

from httpx import ASGITransport, AsyncClient

from starter.main import app


async def test_root() -> None:
    """Root endpoint returns greeting."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/")
    assert response.status_code == 200
    assert "Hello from" in response.json()["message"]


async def test_health() -> None:
    """Health endpoint returns status and environment."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["environment"] == "local"
