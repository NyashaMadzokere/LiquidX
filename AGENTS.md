## LiquidX Agent Rules (Humans + AI)

### Source vs compiled files

- **Edit**: `*.liquid` source templates
- **Do not edit**: `*.compiled.liquid` (generated artifacts)

### When changing Liquid templates

1. Prefer LiquidX syntax where it reduces boilerplate:
   - `{% lx-if condition "A" "B" %}`
   - `{% assign map = { "k": "v" } %}`
2. After edits, run the compiler to generate updated artifacts:
   - `liquidx path/to/file.liquid`

### Examples workflow

- Compile: `npm run liquidx:compile:examples`
- Verify: `npm run liquidx:check:examples`

### Supported syntax (v0.1)

- Map/object assign blocks: `{% assign x = { "A": "a.svg" } %}`
- `lx-if`: `{% lx-if condition "true" "false" %}`

