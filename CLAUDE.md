# CLAUDE.md — iOS Swift Starter

> **Session start checklist:**
> 1. Read this file fully to orient yourself
> 2. Read `.claude/docs/` for skill and tool references  
> 3. Review `tasks/lessons.md` for project-specific patterns
> 4. Use the `swiftui-expert` skill for all SwiftUI tasks — invoke explicitly:
>    *"Use the swiftui expert skill and review this view."*

---

## Project Overview

<!-- TODO: Describe what this app does -->

## Architecture

- **UI**: SwiftUI (iOS 26+)
- **Pattern**: MVVM
- **Project**: `project.yml` (XcodeGen) → generates `.xcodeproj`
- **Dependencies**: Swift Package Manager only
- **Concurrency**: Swift Concurrency (`async/await`, `Actor`)
- **Testing**: Swift Testing framework (not XCTest)
- **AI Skill**: [AvdLee/SwiftUI-Agent-Skill](https://github.com/AvdLee/SwiftUI-Agent-Skill) — auto-installed via `.claude/settings.json`
  - Covers: state management, modern APIs, performance, sheets, navigation, lists, Liquid Glass (iOS 26+)
  - Also available: [Swift Concurrency Expert](https://github.com/AvdLee/Swift-Concurrency-Agent-Skill), [Swift Testing Expert](https://github.com/AvdLee/Swift-Testing-Agent-Skill), [Core Data Expert](https://github.com/AvdLee/Core-Data-Agent-Skill)
- **MCP — iOS Simulator**: [joshuayoes/ios-simulator-mcp](https://github.com/joshuayoes/ios-simulator-mcp) — configured in `.claude/mcp.json`
  - Claude can screenshot, tap, swipe, type, inspect accessibility tree, record video
  - Requires: `brew tap facebook/fb && brew install idb-companion`

## Key Conventions

### Swift Specific
- `@MainActor` on all ViewModels — UI updates must be on main thread
- Use `@Observable` macro (iOS 26+) over `ObservableObject` where possible
- Prefer `struct` over `class` for models unless you need reference semantics
- Use `enum` with associated values for state machines, not Bool flags
- No force unwraps (`!`) — use `guard let` or `if let`
- Use `Logger` (os.log) for structured logging — never `print()` in production code

### Security
- **Sensitive data**: use Keychain — never store tokens, passwords, or PII in `UserDefaults`
- **Logging**: never log tokens, passwords, or personal data — not even in DEBUG builds
- **ATS**: App Transport Security must stay enabled — don't add `NSAllowsArbitraryLoads` without a documented reason
- **Privacy manifest**: `PrivacyInfo.xcprivacy` is required for App Store submission — declare all API usage and data collection
- **WebView**: validate and sanitize all data passed into `WKWebView` to prevent injection

### Accessibility
- Every interactive element needs `.accessibilityLabel` and `.accessibilityHint`
- Use `.accessibilityRole` for custom controls
- Test with the simulator MCP's `ui_describe_all` to verify the accessibility tree — this is how Claude sees your UI
- VoiceOver-compatible layouts aren't optional — build them from the start

### Project Layout
```
project.yml             # XcodeGen spec → run `xcodegen generate`
Package.swift           # SPM dependencies
StarterApp/Sources/
  StarterApp.swift      # @main App entry point
  Views/                # SwiftUI views
  ViewModels/           # @MainActor view models
  Models/               # Data models (structs/enums)
  Services/             # Network, persistence, etc.
StarterApp/Tests/       # Swift Testing test suite
StarterApp/Resources/   # PrivacyInfo.xcprivacy, assets
```

### Testing
- Use Swift Testing framework (`import Testing`, `@Test`, `#expect`) — not XCTest
- **Write tests alongside new features** — not as an afterthought before committing
- Test ViewModel logic and business logic — not SwiftUI view rendering
- ViewModels must be unit-testable without UI dependencies (no SwiftUI imports in ViewModels)
- Use `@MainActor` in test suites that test `@MainActor` types
- For async tests use `await confirmation(...)` or `withCheckedThrowingContinuation` — not `sleep`
- Use the simulator MCP's `ui_describe_all` to verify UI behaviour visually — complementary to unit tests, not a replacement
- Run: `xcodebuild test -project StarterApp.xcodeproj -scheme StarterAppTests -destination "platform=iOS Simulator,name=iPhone 16 Pro"`

### Git
- Commit working states frequently — never leave the scheme broken
- Keep commits atomic: one logical change per commit
- Build and run tests before committing

## Common Commands

```bash
# Generate Xcode project (after editing project.yml or first clone)
xcodegen generate

# Build
xcodebuild build -project StarterApp.xcodeproj -scheme StarterApp -destination "platform=iOS Simulator,name=iPhone 16 Pro"

# Test
xcodebuild test -project StarterApp.xcodeproj -scheme StarterAppTests -destination "platform=iOS Simulator,name=iPhone 16 Pro"

# Format (if swift-format installed)
swift-format format --recursive --in-place StarterApp/Sources/
```

## SwiftUI Skill Setup (first time / new team member)

The SwiftUI Agent Skill is configured in `.claude/settings.json` and auto-prompted when you open this project.

To install manually:
```
/plugin marketplace add AvdLee/SwiftUI-Agent-Skill
/plugin install swiftui-expert@swiftui-expert-skill
```

---

## MCP Tools

### iOS Simulator
[joshuayoes/ios-simulator-mcp](https://github.com/joshuayoes/ios-simulator-mcp) — direct simulator control.

| Tool | What it does |
|------|-------------|
| `ui_view` | Screenshot current screen (returns image to Claude) |
| `ui_describe_all` | Full accessibility tree — how Claude "sees" the UI |
| `ui_tap` | Tap at x,y coordinates |
| `ui_type` | Type text into focused input |
| `ui_swipe` | Swipe from one point to another |
| `screenshot` | Save screenshot to `./tmp/` |
| `record_video` / `stop_recording` | Record simulator screen |

**Workflow:** build → run on simulator → Claude inspects via `ui_view` → iterate

### Context7 — Live Docs
Add `use context7` to any prompt for up-to-date Swift/Apple docs:
```
How do I use the @Observable macro correctly? use context7
Show me the latest Swift Testing API. use context7
use library /apple/swift-concurrency — how do TaskGroup work?
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
- **Agent teams (swarm mode)**: for large tasks where workers need to coordinate directly with each other (e.g. UI layer + business logic + tests in parallel), consider enabling agent teams — `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in `settings.json`. Each teammate gets its own context window and can message teammates directly. Best for well-scoped, high-value tasks — it burns tokens fast. Docs: https://code.claude.com/docs/en/agent-teams

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md`
- Write a rule that would have prevented the mistake
- Review `tasks/lessons.md` at session start

### 4. Verification Before Done
- Never mark a task complete without proving it works
- **If you added a feature or fixed a bug: write or update tests for it**
- Build successfully and run tests — fix anything that fails
- For UI changes: use the iOS Simulator MCP — `ui_view` to screenshot, `ui_describe_all` for accessibility tree
- Ask yourself: "Would a staff engineer approve this PR?"

### 5. Demand Elegance
- For non-trivial changes: pause and ask "is there a simpler way?"
- If a fix feels hacky: step back and implement it properly
- Skip this for obvious one-liners

### 6. Autonomous Bug Fixing
- When given a bug: fix it without hand-holding
- Use simulator MCP for UI bugs, logs/tests for logic bugs
- Don't ask what to do — investigate, fix, verify, report

### 7. Destructive Actions
- Always ask before deleting files, dropping data, or making irreversible changes
- Prefer reversible approaches where possible

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
- **Always Latest**: When adding a package or tool and no version is specified, always use the latest stable version. Never pin to an older version without an explicit reason. Use `use context7` to verify the current API if unsure.
- **Performance by Default**: Write fast, efficient code from the start — don't defer it as "premature optimisation". Avoid unnecessary view re-renders, redundant network calls, blocking the main thread, and unoptimised asset loading. If a simpler approach is also the faster one, always prefer it.

---

## Do's and Don'ts

**Do:**
- Use `Keychain` for any sensitive data
- Add `.accessibilityLabel` to every interactive element
- Use `Logger` for structured logging
- Declare API usage in `PrivacyInfo.xcprivacy`
- Use Swift Testing (`@Test`, `#expect`) not XCTest

**Don't:**
- Store tokens or PII in `UserDefaults`
- Use `print()` in production code
- Force unwrap (`!`) outside of test assertions
- Disable ATS without documented justification
- Log any personal or sensitive data
