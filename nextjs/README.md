# nextjs

Next.js 16 starter with Claude Code integration.

**Stack:** Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript · Vitest · Playwright

## Setup

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                   # localhost:3000
```

## Dev Container

Open this folder in VS Code and select **"Reopen in Container"** — Node 24, Playwright browsers, and all dependencies install automatically.

## Claude Code

Open this folder in Claude Code. MCP servers are pre-configured in `.claude/mcp.json`.

Install the recommended skills once:
```
# No skills required — MCPs cover everything for Next.js
```

See `CLAUDE.md` for conventions and workflow.

## Commands

```bash
npm run dev       # Dev server
npm run build     # Production build
npm run lint      # ESLint
npm test          # Vitest
```
