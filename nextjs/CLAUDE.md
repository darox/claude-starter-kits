# CLAUDE.md — Next.js Starter

> **Session start checklist:**
> 1. Ensure you're running inside the dev container (VS Code: "Reopen in Container")
> 2. Read this file fully to orient yourself
> 3. Read `.claude/docs/` for MCP and tool references
> 4. Review `tasks/lessons.md` for project-specific patterns
> 5. Call `next-devtools` `init` tool before any dev work

---

## Project Overview

<!-- TODO: Describe what this app does -->

## Architecture

- **Framework**: Next.js 16, App Router
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library
- **Language**: TypeScript (strict)

## Key Conventions

### Next.js Specific
- Server components by default — use `"use client"` only when genuinely needed
- Co-locate components with their routes unless shared across 3+ routes
- API routes live in `app/api/`
- Shared UI in `components/`, business logic in `lib/`, custom hooks in `hooks/`
- Never fetch data in client components if it can be done in a server component
- Always implement `loading.tsx` and `error.tsx` at the route level — don't leave routes without them
- Configure image domains in `next.config.ts` when using `next/image` with external URLs

### shadcn/ui
- Use the shadcn MCP to install components — don't hand-write component code from scratch
- `components/ui/` is managed by shadcn CLI — don't manually edit files there
- Use `npx shadcn@latest add <component>` or ask Claude via the shadcn MCP
- Customise via Tailwind classes and `cn()` utility, not by editing the installed source

### TypeScript
- Strict mode on — no `any`, no `@ts-ignore` without a comment explaining why
- Prefer `type` over `interface` unless you need declaration merging
- All props must be typed

### Security
- **Server Actions**: always validate inputs with Zod before using them — never trust raw form data
- **Environment variables**: `NEXT_PUBLIC_*` is bundled into the client — audit before adding anything sensitive there
- **Security headers**: configure in `next.config.ts` — CSP, X-Frame-Options, HSTS at minimum
- **Auth checks**: enforce in middleware, not just in page components — middleware runs before rendering
- **Dynamic params**: sanitize route params and query strings before using in DB queries or external calls

### Testing
- Tests live in `tests/` or co-located as `*.test.tsx`
- **Write tests alongside new features** — not as an afterthought before committing
- Test behaviour, not implementation details — query by role/label (`getByRole`, `getByLabelText`), never by test ID unless unavoidable
- Unit test: pure functions, hooks, and utility logic
- Integration test (React Testing Library): component behaviour from a user's perspective
- E2E test (Playwright): every critical user-facing flow (login, checkout, form submission, navigation)
- Don't test implementation internals — if a refactor breaks tests without changing behaviour, the tests were wrong
- Run: `npm test`

### Git
- Commit working states frequently — never leave `main` broken
- Keep commits atomic: one logical change per commit
- Always run `npm run lint` and `npm test` before committing

## Common Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run lint       # ESLint (flat config)
npm test           # Vitest
```

## Environment Variables

Copy `.env.example` to `.env.local`. Never commit `.env.local`.

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Base API URL | Yes |

---

## MCP Tools

### Playwright — Browser Automation & E2E Testing
[microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) — browser automation and E2E testing.

**Typical workflow:**
1. Make a UI change
2. Ask Claude to open the page in Playwright and verify it looks correct
3. Ask Claude to write or update the E2E test for the changed behaviour

```
Open localhost:3000 with playwright and screenshot the homepage
Use playwright to test the login flow — fill in the form and verify the redirect
Write an E2E test for the checkout page using playwright
```

> Playwright uses accessibility snapshots by default (token-efficient). Add `--caps=vision` to args in `mcp.json` for visual screenshot comparison.

### Next.js DevTools
[vercel/next-devtools-mcp](https://github.com/vercel/next-devtools-mcp) — runtime diagnostics. **Call `init` first every session.**

| Tool | What it does |
|------|-------------|
| `init` | ⚠️ Run first — sets up context, connects to dev server |
| `nextjs_docs` | Search official Next.js documentation |
| `nextjs_runtime` | Live errors, routes, page metadata, Server Actions |
| `get_errors` | Current build/runtime/type errors |
| `get_logs` | Dev server log file path |

> Requires dev server running: `npm run dev`. Next.js 16+ exposes `/_next/mcp` automatically.

### shadcn/ui
[Official shadcn MCP](https://ui.shadcn.com/docs/mcp) — browse, search, and install components from any registry via natural language.

```
Add a login form using shadcn components
Show me all available components in the shadcn registry
```

### Context7 — Live Docs
Add `use context7` to any prompt for up-to-date library docs:
```
Implement middleware that validates JWTs. use context7
How does Next.js App Router handle parallel routes? use context7
use library /shadcn-ui/ui — show me the data-table API
```

---

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- Write the plan to `tasks/todo.md` with checkable items before touching code
- When checking in before starting, confirm: scope, approach, files affected, and any irreversible steps
- If something goes sideways mid-task, STOP and re-plan — don't keep pushing

### 2. Subagent Strategy
- Use subagents to keep the main context clean on long tasks
- Good candidates: parallel research, isolated exploration, long analysis
- Not needed for: straightforward single-file edits, simple bug fixes
- **Agent teams (swarm mode)**: for large tasks where workers need to coordinate directly with each other (e.g. frontend + backend + tests in parallel), consider enabling agent teams — `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in `settings.json`. Each teammate gets its own context window and can message teammates directly. Best for well-scoped, high-value tasks — it burns tokens fast. Docs: https://code.claude.com/docs/en/agent-teams

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md`
- Write a rule that would have prevented the mistake
- Review `tasks/lessons.md` at session start

### 4. Verification Before Done
- Never mark a task complete without proving it works
- **If you added a feature or fixed a bug: write or update tests for it**
- Run `npm run lint && npm test` and fix anything that fails
- For runtime issues: use `next-devtools` `nextjs_runtime` to inspect live errors and logs
- For UI changes: use Playwright to visually confirm the result
- Ask yourself: "Would a staff engineer approve this PR?"

### 5. Demand Elegance
- For non-trivial changes: pause and ask "is there a simpler way?"
- If a fix feels hacky: step back and implement it properly
- Skip this for obvious one-liners

### 6. Autonomous Bug Fixing
- When given a bug: fix it without hand-holding
- Use `next-devtools` for runtime errors, Playwright for UI bugs, logs for everything else
- Don't ask what to do — investigate, fix, verify, report

### 7. Destructive Actions
- Always ask before deleting files, dropping data, or making irreversible changes
- Prefer reversible approaches when possible (soft delete, feature flags, etc.)

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Check In**: Confirm scope, approach, and any risks before starting
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add a review section to `tasks/todo.md` when done
6. **Capture Lessons**: Update `tasks/lessons.md` after any correction

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Only touch what's necessary. Avoid scope creep and collateral damage.
- **Always Latest**: When adding a library or tool and no version is specified, always use the latest stable version. Never pin to an older version without an explicit reason. Use `use context7` to verify the current API if unsure.
- **Performance by Default**: Write fast, efficient code from the start — don't defer it as "premature optimisation". Avoid unnecessary re-renders, redundant network calls, unindexed queries, and blocking operations. If a simpler approach is also the faster one, always prefer it.

---

## Do's and Don'ts

**Do:**
- Prefer `next/image` over raw `<img>`
- Use `loading.tsx` and `error.tsx` for every route segment
- Cache aggressively with `fetch` options and `unstable_cache`
- Validate Server Action inputs with Zod
- Audit `NEXT_PUBLIC_*` vars — they ship to the browser

**Don't:**
- Put business logic in page components
- Use `useEffect` for data fetching — use server components or SWR/React Query
- Trust Server Action inputs without validation
- Expose secrets via `NEXT_PUBLIC_` prefix
- Commit `.next/`, `node_modules/`, or `.env.local`
