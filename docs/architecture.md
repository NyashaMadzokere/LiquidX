# liquidx-cli Architecture

## Goals
- Keep CLI argument parsing separate from compile logic.
- Keep file-system concerns isolated for easier testing and replacement.
- Provide a compiler service boundary that supports future plugins and transforms.

## Module Layout
- `bin/liquidx.js`: Entry point executable for the `liquidx` command.
- `lib/cli.js`: Input validation, help text, orchestration, and error handling.
- `lib/compiler.js`: Compilation pipeline entry.
- `lib/file-system.js`: File read/write utilities and output path conventions.
- `lib/errors.js`: Domain-specific errors with process-friendly exit codes.

## Extension Points
- Add compiler stages in `lib/compiler.js` (tokenization, transforms, optimization).
- Add flags in `lib/cli.js` and thread options into `compileLiquid`.
- Replace storage implementation in `lib/file-system.js` (e.g., in-memory for tests).
