# CLAUDE.md — Python Starter

> **Session start checklist:**
> 1. Ensure you're running inside the dev container (VS Code: "Reopen in Container")
> 2. Read this file fully to orient yourself
> 3. Read `.claude/docs/` for MCP and tool references
> 4. Review `tasks/lessons.md` for project-specific patterns

---

## Project Overview

<!-- TODO: Describe what this project does -->

## Architecture

- **Language**: Python 3.13+
- **Package manager**: uv (fast, drop-in pip replacement)
- **Linter / formatter**: ruff
- **Type checker**: mypy (strict)
- **Framework**: FastAPI + uvicorn
- **Testing**: pytest + pytest-asyncio + httpx

## Key Conventions

### Python Style
- Target Python 3.13+ — use modern syntax: `X | Y` union types, `match` statements, `tomllib`, etc.
- Type-annotate everything: function signatures, class attributes, module-level variables
- No `# type: ignore` without an explanatory comment
- Prefer dataclasses or Pydantic models over raw dicts for structured data
- Use `pathlib.Path` over `os.path` everywhere
- Never use mutable default arguments (`def f(x=[])` is a bug)

### Project Structure
```
src/starter/          # Main package (src layout)
  __init__.py
  main.py
tests/                # Pytest test suite
  conftest.py
  test_*.py
pyproject.toml        # All config lives here (ruff, mypy, pytest)
```

### Async
- Use `async/await` for I/O-bound work — never `time.sleep()` in async code
- Use `asyncio.TaskGroup` (Python 3.11+) for structured concurrency — not bare `asyncio.gather`
- Use `anyio` if you need backend-agnostic async (e.g. switching between asyncio and trio)
- Don't mix sync and async code without `asyncio.run()` or `run_in_executor`

### Security
- **Secrets**: use environment variables or `.env` via `python-dotenv` — never hardcode credentials
- **User input**: validate with Pydantic or manual checks before using in subprocess, SQL, or filesystem operations
- **Subprocess**: use `subprocess.run([...], shell=False)` — never `shell=True` with user-provided input
- **Dependencies**: pin transitive deps in `uv.lock`, audit with `pip-audit`

### Testing
- Tests live in `tests/` — match source structure (`tests/test_main.py` ↔ `src/starter/main.py`)
- **Write tests alongside new features** — not as an afterthought before committing
- Use `pytest` fixtures for shared setup — not `setUp/tearDown`
- Use `pytest-asyncio` for async tests — annotate with `@pytest.mark.asyncio`
- Mock external I/O with `pytest-mock` or `unittest.mock.patch` — never make real network calls in tests
- Test behaviour, not implementation — if a refactor breaks tests without changing behaviour, the tests were wrong
- Aim for fast tests: slow tests don't get run
- Run: `uv run pytest`

### Git
- Commit working states frequently — never leave `main` broken
- Keep commits atomic: one logical change per commit
- Always run `uv run ruff check . && uv run mypy . && uv run pytest` before committing

## Common Commands

```bash
uv run uvicorn starter.main:app --reload  # Run the API server
uv run pytest                   # Run tests
uv run pytest -x                # Stop on first failure
uv run ruff check .             # Lint
uv run ruff format .            # Format
uv run mypy .                   # Type check
uv add <package>                # Add a dependency
uv add --dev <package>          # Add a dev dependency
uv sync                         # Install all deps from lockfile
```

## Environment Variables

Copy `.env.example` to `.env`. Never commit `.env`.

| Variable | Description | Required |
|----------|-------------|----------|
| `EXAMPLE_API_KEY` | Example API key | No |

---

## MCP Tools

### Context7 — Live Docs
Add `use context7` to any prompt for up-to-date library docs:
```
How do I use asyncio.TaskGroup in Python 3.13? use context7
Show me the Pydantic v2 model_validator API. use context7
use library /tiangolo/fastapi — show me the dependency injection system
```

### GitHub
Manages PRs, issues, branches directly from Claude Code. Requires `GITHUB_PERSONAL_ACCESS_TOKEN`.

---

## Skills

This starter uses the `wshobson/agents` `python-development` plugin — 3 specialised Python agents and 5 skills:

- **python-pro agent**: Modern Python architecture, design patterns, idiomatic code
- **async-expert agent**: asyncio, anyio, concurrent patterns, performance
- **python-debugger agent**: Root cause analysis, tracing, profiling

Install once in Claude Code:
```
/plugin marketplace add wshobson/agents
/plugin install python-development
```

After install, just describe what you need — the agents activate automatically:
```
Optimise the async pipeline for throughput    # → async-expert
Debug why this coroutine deadlocks            # → python-debugger
Refactor this module to follow clean arch     # → python-pro
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
- **Agent teams (swarm mode)**: for large tasks where workers need to coordinate directly with each other (e.g. API layer + data models + tests in parallel), consider enabling agent teams — `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in `settings.json`. Each teammate gets its own context window and can message teammates directly. Best for well-scoped, high-value tasks — it burns tokens fast. Docs: https://code.claude.com/docs/en/agent-teams

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md`
- Write a rule that would have prevented the mistake
- Review `tasks/lessons.md` at session start

### 4. Verification Before Done
- Never mark a task complete without proving it works
- **If you added a feature or fixed a bug: write or update tests for it**
- Run `uv run ruff check . && uv run mypy . && uv run pytest` and fix anything that fails
- Ask yourself: "Would a staff engineer approve this PR?"

### 5. Demand Elegance
- For non-trivial changes: pause and ask "is there a simpler way?"
- If a fix feels hacky: step back and implement it properly
- Skip this for obvious one-liners

### 6. Autonomous Bug Fixing
- When given a bug: fix it without hand-holding
- Check logs, run tests with `-x -v`, use the python-debugger agent for hard cases
- Don't ask what to do — investigate, fix, verify, report

### 7. Destructive Actions
- Always ask before deleting files, dropping data, or making irreversible changes
- Prefer reversible approaches when possible

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
- **Always Latest**: When adding a package and no version is specified, always use the latest stable version. Never pin to an older version without an explicit reason. Use `use context7` to verify the current API if unsure.
- **Performance by Default**: Write fast, efficient code from the start — don't defer it as "premature optimisation". Avoid blocking the event loop, O(n²) algorithms where O(n) exists, redundant I/O, and holding locks longer than necessary. If a simpler approach is also the faster one, always prefer it.

---

## Do's and Don'ts

**Do:**
- Use `uv` for everything — adding deps, running scripts, managing the venv
- Use `pathlib.Path` for all filesystem operations
- Use `asyncio.TaskGroup` for concurrent async work
- Validate external data with Pydantic at the boundary
- Use `logging` (not `print`) for observability
- Use `python-dotenv` to load `.env` in development

**Don't:**
- Use `os.path` — use `pathlib` instead
- Use `shell=True` in subprocess calls with any user input
- Catch bare `except:` — always catch specific exception types
- Use mutable default arguments in function signatures
- Commit `.env`, `__pycache__/`, or `.venv/`
- Use `asyncio.sleep(0)` as a yield hack — use `asyncio.TaskGroup` properly
