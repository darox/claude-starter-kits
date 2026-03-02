# Next.js DevTools MCP

Official Vercel MCP server for Next.js development: [vercel/next-devtools-mcp](https://github.com/vercel/next-devtools-mcp)

Pre-configured in `.claude/mcp.json` as `next-devtools`.

## ⚠️ Required: call `init` at session start

Every Next.js session must begin with the `init` tool call. This establishes project context and connects to the running dev server.

Add this to your prompt or Claude will be reminded by `CLAUDE.md`:

> "Use next-devtools init to set up context"

## Prerequisites

- Next.js dev server running: `npm run dev`
- Next.js 16+ for the built-in `/_next/mcp` endpoint (older versions have limited support)

## Tools

| Tool | Description |
|------|-------------|
| `init` | **Start here** — sets up context, loads docs, connects to dev server |
| `nextjs_docs` | Search official Next.js documentation (action: search/get) |
| `nextjs_runtime` | Connect to live dev server for real-time diagnostics |
| `get_errors` | Current build errors, runtime errors, type errors |
| `get_logs` | Path to the dev server log file |
| `get_page_metadata` | Routes, components, rendering info for a specific page |
| `get_server_action_by_id` | Find source file/function for a Server Action by ID |
| `browser_eval` | Playwright integration — evaluate JS in the browser |
| `upgrade_nextjs_16` | Guided upgrade to Next.js 16 |
| `enable_cache_components` | Guidance on enabling Cache Components |

## Example prompts

```
Use next-devtools init, then check for any current errors in the app.
```

```
What routes are registered in this Next.js app? Use next-devtools.
```

```
There's a hydration error — use next-devtools to get the runtime logs and fix it.
```

```
Search the Next.js docs for how to use unstable_cache. use next-devtools.
```

## Architecture

- Next.js 16+ exposes `/_next/mcp` in the dev server
- `next-devtools-mcp` discovers and proxies to it automatically
- Works across multiple Next.js instances on different ports
