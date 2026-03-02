#!/bin/bash
set -e

echo "🚀 Setting up Python dev environment..."

# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh
export PATH="$HOME/.local/bin:$PATH"

uv sync

echo "✅ Dev environment ready! Run: uv run uvicorn starter.main:app --reload"
