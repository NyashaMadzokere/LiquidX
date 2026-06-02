# LiquidX for VS Code

Compile **LiquidX** syntax to standard **Shopify Liquid** directly inside VS Code.

## Features

- **Compile Active File** — `LiquidX: Compile Active File`
- **Compile and Open Output** — opens `*.compiled.liquid` after compile
- **Compile on Save** — optional setting
- **Syntax highlighting** for `lx-if` and map/object assign blocks (in `.liquid` and `.lx.liquid`)
- **Bundled compiler** — works without global CLI install
- **CLI override** — optional `liquidx.cliPath` setting

## Commands

| Command | Default keybinding |
|---------|-------------------|
| `LiquidX: Compile Active File` | `Ctrl+Shift+L` / `Cmd+Shift+L` |
| `LiquidX: Compile and Open Output` | — |

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `liquidx.compileOnSave` | `false` | Compile when saving `.liquid` files |
| `liquidx.openCompiledFile` | `true` | Open compiled output after success |
| `liquidx.showOutputChannel` | `true` | Log compile status to LiquidX output |
| `liquidx.cliPath` | `""` | Optional path to `liquidx` CLI binary |

## Output

Given:

```text
sections/product-card.liquid
```

LiquidX writes:

```text
sections/product-card.compiled.liquid
```

## Development

From the repo root:

```bash
cd vscode-extension
npm install
```

Press **F5** in VS Code (Extension Development Host) with the workspace root opened.

Sync compiler from core package before packaging:

```bash
npm run sync-compiler
npm run package
```

## Requirements

- VS Code `1.85.0` or newer
- Node.js `18.18+` (for CLI override mode)

## Credits

Developed By Nyasha Madzokete
