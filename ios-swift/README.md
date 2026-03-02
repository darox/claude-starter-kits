# ios-swift

iOS 26 SwiftUI starter with Claude Code integration.

**Stack:** Swift 6.2 · SwiftUI · iOS 26 · Swift Testing · MVVM · `@Observable`

## Setup

> **No dev container** — iOS development requires Xcode running natively on macOS. Containerised builds cannot access the iOS Simulator or the required Apple toolchain.

1. Install XcodeGen if you don't have it: `brew install xcodegen`
2. Generate the Xcode project: `xcodegen generate`
3. Open `StarterApp.xcodeproj` in Xcode
4. Select an iOS simulator (e.g. iPhone 16 Pro)
5. Build & run (⌘R)

### iOS Simulator MCP (required for Claude Code)

```bash
brew tap facebook/fb
brew install idb-companion
```

## Claude Code

Open this folder in Claude Code. MCP servers are pre-configured in `.claude/mcp.json`.

Install the recommended skills once:
```
/plugin marketplace add AvdLee/SwiftUI-Agent-Skill
```

(Or it auto-installs via `.claude/settings.json`)

See `CLAUDE.md` for conventions and workflow.

## Commands

```bash
# Generate Xcode project
xcodegen generate

# Build
xcodebuild build -project StarterApp.xcodeproj -scheme StarterApp -destination "platform=iOS Simulator,name=iPhone 16 Pro"

# Test
xcodebuild test -project StarterApp.xcodeproj -scheme StarterAppTests -destination "platform=iOS Simulator,name=iPhone 16 Pro"
```
