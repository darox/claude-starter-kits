# iOS Simulator MCP

This project uses [joshuayoes/ios-simulator-mcp](https://github.com/joshuayoes/ios-simulator-mcp) — an MCP server that lets Claude interact directly with the iOS Simulator.

Pre-configured in `.claude/mcp.json`. Screenshots and recordings save to `./tmp/`.

## Prerequisites

Xcode must be installed, plus Facebook IDB:

```bash
brew tap facebook/fb
brew install idb-companion
```

## What Claude can do with this

| Tool | What it does |
|------|-------------|
| `get_booted_sim_id` | Get the UDID of the booted simulator |
| `open_simulator` | Open the Simulator app |
| `ui_view` | Screenshot the current screen (returns image to Claude) |
| `screenshot` | Save a screenshot to `./tmp/` |
| `ui_describe_all` | Dump full accessibility tree of the screen |
| `ui_describe_point` | Inspect accessibility element at x,y |
| `ui_tap` | Tap at x,y coordinates |
| `ui_type` | Type text into focused input |
| `ui_swipe` | Swipe from one point to another |
| `record_video` | Start recording simulator screen to `./tmp/` |
| `stop_recording` | Stop the current recording |
| `install_app` | Install a `.app` or `.ipa` bundle |
| `launch_app` | Launch an app by bundle ID |

## How to use in a session

After building and running the app on simulator, tell Claude:

```
View the current simulator screen and verify the login form renders correctly.
```

```
Tap the "Sign In" button (describe the screen first to find coordinates).
```

```
Run a QA pass on the onboarding flow — navigate through each screen and describe what you see.
```

```
Take a screenshot and save it to tmp/onboarding-step1.png
```

## Workflow tip

Use this in combination with the SwiftUI skill for a tight build → verify loop:

1. Claude writes/edits SwiftUI code (using swiftui-expert skill for correctness)
2. You build and run on simulator
3. Claude inspects the result via `ui_view` or `ui_describe_all`
4. Claude iterates based on what it sees

## Security note

Use v1.3.3 or later (the `npx -y ios-simulator-mcp` in `mcp.json` always pulls latest). Versions before 1.3.3 had command injection vulnerabilities.
