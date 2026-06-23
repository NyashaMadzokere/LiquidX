# LiquidX Roadmap

This roadmap focuses on **theme-developer value first**, then tooling and correctness upgrades that enable production adoption.

## Guiding principles

- **Shopify compatibility**: output must remain valid Shopify Liquid.
- **Source vs artifact**: developers edit source; compiled output is generated and replaceable.
- **Incremental adoption**: features should be optional and usable section-by-section.
- **Tooling friendly**: stable CLI, machine-readable output, predictable workflows (CI + editors + AI).

---

## v0.1 (current)

- Regex-based compiler transforms
  - Map/object assign blocks
  - `lx-if` shorthand
- CLI compile to `*.compiled.liquid`
- VS Code extension (compile commands, compile on save, basic highlighting)
- Example snippets library

---

## v0.2 — Workflow + reliability

### CLI improvements

- **`--check` mode**: fail if compiled output is missing/out-of-date (CI friendly)
- **`--json` mode**: machine-readable compile summary for editor/AI automation
- **Batch compile**: compile a folder (sections/snippets) with include/exclude rules
- **Watch mode**: compile on change for local theme dev loops

### Repo automation

- GitHub Actions: run `liquidx` checks on PRs
- Add npm scripts for repeatable commands (`compile`, `check`, `watch`)
- Standardize generated artifacts policy (gitignored by default; optional publish mode)

### Developer experience

- Better error messages with actionable hints (what pattern failed / where)
- Extension: show compile output in an OutputChannel + errors as Diagnostics

---

## v0.3 — Expanded syntax (high-impact theme sugar)

### Control flow

- `lx-elseif` / `lx-when` (less boilerplate than long `elsif` chains)
- `lx-switch` (badge and label routing becomes readable)

### Data ergonomics

- Safe map lookup support (`map[key]` pattern) with predictable compilation strategy
- Default/coalesce helpers for common Liquid patterns (`blank` checks, fallback chains)

### Templates

- Snippets for common commerce patterns (badges, shipping threshold, stock messaging)
- Code actions (VS Code): convert existing `if/elsif` blocks into LiquidX forms

---

## v0.4 — AST parser (correctness + maintainability)

Regex transforms are a great v0.1, but a parser unlocks correctness and richer features.

- Implement a Liquid/LiquidX tokenization layer
- Build an AST for tags/outputs/blocks with source locations
- Transform using AST + reprint with stable formatting
- Diagnostics with line/column ranges (editor-ready)

Deliverables:
- Fewer false positives/negatives
- Safer transforms on large Shopify sections (e.g. `main-product.liquid`)
- Ability to support nested structures reliably

---

## v0.5 — Shopify CLI integration

Goal: zero-friction theme workflow.

- `shopify theme dev` integration:
  - compile before serving / on save
- `shopify theme push` integration:
  - compile before upload
- Config file (`liquidx.config.json`) to declare:
  - source roots
  - output strategy
  - strict/check modes

---

## v1.0 — Production-grade release

- Stability guarantees on output and CLI flags
- Test suite with real theme fixtures + snapshot outputs
- Performance profiling for large themes
- VS Code Marketplace publish with:
  - icon, screenshots, demo GIF
  - changelog + versioning discipline

---

## Suggested issue list (copy into GitHub Issues)

### CLI / tooling

- Add `liquidx --check` and `liquidx --json`
- Add `liquidx compile <dir>` batch mode
- Add `liquidx watch <dir>` mode
- Add `liquidx check <dir>` mode

### Compiler

- Add `lx-switch` syntax
- Add safe map lookup strategy (design doc + implementation)
- Add AST parser spike (prototype tokenizer + basic tag parsing)

### VS Code extension

- Show compile failures as Diagnostics
- Add “Compile folder” command
- Add code actions: “Convert to `lx-if`”

### CI

- Add GitHub Action running `npm run liquidx:check:examples`
- Add release workflow to package extension `.vsix`

