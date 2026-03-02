# SwiftUI Agent Skill

This project uses the [AvdLee/SwiftUI-Agent-Skill](https://github.com/AvdLee/SwiftUI-Agent-Skill).

## Auto-setup

The skill is configured in `.claude/settings.json`. When a team member opens this project in Claude Code, they'll be prompted to install it automatically.

## Manual install (if not prompted)

```
/plugin marketplace add AvdLee/SwiftUI-Agent-Skill
/plugin install swiftui-expert@swiftui-expert-skill
```

## How to invoke

Always be explicit when you want the skill applied:

> "Use the swiftui expert skill and review this view for state management and modern API improvements."
> "Use the swiftui expert skill to audit this list for performance issues."
> "Use the swiftui expert skill — what's the modern replacement for this deprecated API?"

## What it covers

| Area | Skill reference file |
|------|----------------------|
| State management (`@State`, `@Observable`, `@Bindable`) | `state-management.md` |
| Sheets & navigation | `sheet-navigation-patterns.md` |
| List & ForEach identity | `list-patterns.md` |
| Performance & hot paths | `performance-patterns.md` |
| Scroll patterns | `scroll-patterns.md` |
| Deprecated API replacements | `modern-apis.md` |
| Animations (basic, advanced, transitions) | `animation-*.md` |
| Liquid Glass (iOS 26+) | `liquid-glass.md` |
| View structure & composition | `view-structure.md` |
| Image optimization | `image-optimization.md` |
| Text formatting | `text-formatting.md` |
| Layout best practices | `layout-best-practices.md` |

## Related skills (install separately if needed)

- [Swift Concurrency Expert](https://github.com/AvdLee/Swift-Concurrency-Agent-Skill)
- [Swift Testing Expert](https://github.com/AvdLee/Swift-Testing-Agent-Skill)
- [Core Data Expert](https://github.com/AvdLee/Core-Data-Agent-Skill)
