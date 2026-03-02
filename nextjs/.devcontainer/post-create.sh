#!/bin/bash
set -e

echo "🚀 Setting up Next.js dev environment..."

npm install

# Install Playwright browsers for the Playwright MCP
npx -y playwright@latest install chromium --with-deps 2>/dev/null || true

echo "✅ Dev environment ready! Run: npm run dev"
