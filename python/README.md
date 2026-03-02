# python

Python 3.13 FastAPI starter with Claude Code integration.

**Stack:** Python 3.13 · FastAPI · uv · ruff · mypy (strict) · pytest

## Setup

```bash
# Install uv if you don't have it
curl -LsSf https://astral.sh/uv/install.sh | sh

uv sync
cp .env.example .env   # fill in values
uv run uvicorn starter.main:app --reload
```

Open http://localhost:8000 — API docs at http://localhost:8000/docs

## Dev Container

Open this folder in VS Code and select **"Reopen in Container"** — Python 3.13, uv, and all dependencies install automatically.

## Claude Code

Open this folder in Claude Code. MCP servers are pre-configured in `.claude/mcp.json`.

Install the recommended skills once:
```
/plugin marketplace add wshobson/agents
/plugin install python-development
```

See `CLAUDE.md` for conventions and workflow.

## Commands

```bash
uv run uvicorn starter.main:app --reload  # Run API server
uv run pytest                             # Tests
uv run ruff check .                       # Lint
uv run ruff format .                      # Format
uv run mypy .                             # Type check
uv add <package>                          # Add dependency
```
