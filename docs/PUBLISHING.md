# Publishing LiquidX

Guide for publishing the CLI to npm and the VS Code extension to the Marketplace.

## Prerequisites

- npm account: https://www.npmjs.com/signup
- Azure DevOps / Visual Studio Marketplace publisher: https://marketplace.visualstudio.com/manage
- GitHub repo public: https://github.com/NyashaMadzokere/LiquidX

---

## Publish CLI to npm

### 1. Log in

```bash
npm login
```

### 2. Verify package metadata

Check `package.json`:

- `name`: `liquidx-cli` (confirm availability on npm)
- `version`: bump for each release
- `author`: your name and email
- `repository`, `homepage`, `bugs`

### 3. Dry run

```bash
npm pack --dry-run
```

### 4. Publish

```bash
npm publish --access public
```

### 5. Verify install

```bash
npm install -g liquidx-cli
liquidx --help
```

---

## Publish VS Code extension

### 1. Install packaging tool

```bash
cd vscode-extension
npm install
```

### 2. Sync compiler bundle

```bash
npm run sync-compiler
```

### 3. Package VSIX

```bash
npm run package
```

Creates `liquidx-0.1.0.vsix`.

### 4. Create publisher (one-time)

1. Go to https://marketplace.visualstudio.com/manage
2. Create publisher ID (e.g. `nyasha-madzokere`)
3. Match `publisher` in `vscode-extension/package.json`

### 5. Get Personal Access Token

1. Azure DevOps → User settings → Personal access tokens
2. Scope: **Marketplace (Manage)**

### 6. Publish

```bash
npx @vscode/vsce publish -p <YOUR_PAT>
```

Or install locally:

```bash
code --install-extension ./liquidx-0.1.0.vsix
```

---

## Release checklist

- [ ] All tests pass: `npm test`
- [ ] Examples check passes: `npm run liquidx:check:examples`
- [ ] Version bumped in `package.json` and `vscode-extension/package.json`
- [ ] `CHANGELOG.md` updated (optional but recommended)
- [ ] README reflects current install instructions
- [ ] Tag release on GitHub: `git tag v0.1.0 && git push origin v0.1.0`
