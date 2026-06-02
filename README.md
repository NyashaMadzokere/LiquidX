# LiquidX CLI

**Modern syntax compiler for Shopify Liquid**

LiquidX CLI brings expressive, developer-friendly syntax to Shopify Liquid and compiles it into standard Liquid you can ship today.

## Why LiquidX Exists

Shopify Liquid is powerful, but writing larger templates can get repetitive fast:
- No native object/map ergonomics for quick key-value lookups
- Verbose conditional rendering for simple inline decisions
- Harder-to-maintain template logic as storefront complexity grows

LiquidX CLI reduces that friction with concise syntax and predictable compilation output.

## Features

- **Map/object syntax**
  - Write object-like assign blocks for cleaner key-value template patterns
- **`lx-if` shorthand**
  - Replace repetitive `if/else` blocks with compact conditional expressions

## Quick Start

### Installation

```bash
npm install -g liquidx-cli
```

### Compile a template

```bash
liquidx ./examples/sample.liquid
```

Expected CLI output:

```text
Compiling sample.liquid...
Done ✔ sample.compiled.liquid
Compiled: sample.liquid -> sample.compiled.liquid
```

This writes:

```text
./examples/sample.compiled.liquid
```

For command help:

```bash
liquidx --help
```

## Before / After

### Before (LiquidX syntax)

```liquid
{% assign badge = { "A": "a.svg", "B": "b.svg" } %}
{% lx-if product.available "In stock" "Sold out" %}
```

### After (Shopify Liquid output)

```liquid
{% case badge %}
{% when "A" %} a.svg
{% when "B" %} b.svg
{% endcase %}
{% if product.available %} In stock {% else %} Sold out {% endif %}
```

## Project Layout

```text
bin/       # CLI entrypoint
lib/       # Core compiler + transform layers
examples/  # Realistic LiquidX inputs
docs/      # Architecture notes
test/      # Manual runner for quick validation
```

## Local Validation

```bash
node ./test/run.js
```

## Roadmap

- AST parser upgrade
- VS Code extension
- Shopify CLI integration

## License

MIT. See `LICENSE`.

## Credits

Developed By Nyasha Madzokete
