# shadcn/ui MCP

Official shadcn MCP server: [ui.shadcn.com/docs/mcp](https://ui.shadcn.com/docs/mcp)

Pre-configured in `.claude/mcp.json` as `shadcn`. Runs via `npx shadcn@latest mcp`.

## What it does

Connects Claude to the shadcn component registry (and any registries configured in `components.json`) so components can be browsed, searched, and installed using natural language — no manual CLI commands needed.

## Tools available

| Tool | Description |
|------|-------------|
| Browse components | List all available components, blocks, templates |
| Search | Find components by name or description |
| Install | Add components to your project |
| Registry access | Works with shadcn/ui, third-party, and private registries |

## Example prompts

```
Show me all available components in the shadcn registry
```

```
Add a login form with email/password fields using shadcn components
```

```
Install the data-table, calendar, and command components
```

```
Find me a dashboard sidebar block and install it
```

```
Build a landing page hero section using shadcn components
```

## Registry configuration

Registries are defined in `components.json`. To add a third-party or private registry:

```json
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json",
    "@internal": {
      "url": "https://registry.company.com/{name}",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

Then install from it:
```
Install the @acme/hero component
```

## Important conventions

- `components/ui/` is managed by the shadcn CLI — **don't manually edit files there**
- Customise components via Tailwind classes and `cn()` utility
- If you need to change a component's behaviour, copy it out of `ui/` and modify the copy
- Always use the MCP (or `npx shadcn@latest add`) rather than writing component code by hand
