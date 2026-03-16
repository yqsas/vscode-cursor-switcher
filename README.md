# VSCode Cursor Switcher

Jump between VS Code and Cursor at the same file and cursor position.

## Features

- Right-click in editor: quick `Switch to ...` entry at the top.
- Right-click in file explorer: same `Switch to ...` entry for selected files.
- Auto-detects current file path and cursor position (line/column).
- Uses deep links:
  - `cursor://file/<path>:<line>:<column>`
  - `vscode://file/<path>:<line>:<column>`
- In explorer context (no open editor), opens selected file at `1:1`.

## Requirements

- The target editor (VS Code or Cursor) is installed.
- URI schemes are registered in your OS (`vscode://`, `cursor://`).
- For full line/column sync, run the command from an active text editor.

## Usage

### Editor context menu (recommended)

1. Open a file and place the cursor at your target location.
2. Right-click in the editor.
3. Click `Switch to Cursor` or `Switch to VS Code`.

### Explorer context menu

1. Right-click a file in the file tree.
2. Click `Switch to Cursor` or `Switch to VS Code`.
3. If the same file is currently active in editor, current cursor line/column is preserved; otherwise starts at `1:1`.

### Command palette

- `Switch to Cursor`
- `Switch to VS Code`

## Configuration

- `switcher.showSuccessMessage` (default: `false`)  
  Show a success toast after launching the target editor.

## Local development

```bash
npm install
npm run compile
```

Press `F5` to launch Extension Development Host.

## Build VSIX

```bash
npx @vscode/vsce package
```

This generates a file like `vscode-cursor-switcher-0.1.0.vsix` in project root.

## Install VSIX

### Install in VS Code

- Command palette: `Extensions: Install from VSIX...`
- Or CLI:

```bash
code --install-extension vscode-cursor-switcher-0.1.0.vsix
```

### Install in Cursor

- Command palette: `Extensions: Install from VSIX...`
- Choose the same `.vsix` file.

## Publish to GitHub

1. Create a GitHub repository and push this project.
2. Update `package.json`:
   - `publisher`
   - `repository.url`
3. Create a release tag, for example `v0.1.0`.

## Publish to VS Code Marketplace

1. Install the tool:

```bash
npm i -g @vscode/vsce
```

2. Create your publisher in Marketplace.
3. Create an Azure DevOps PAT with `Marketplace > Manage`.
4. Publish:

```bash
vsce publish
```

Or package first and upload the VSIX in publisher portal.

## Publish to Open VSX (for Cursor discovery)

Cursor uses Open VSX as extension registry.  
Publishing only to VS Code Marketplace is not enough for Cursor marketplace discovery.

1. Install the tool:

```bash
npm i -g ovsx
```

2. Create Open VSX namespace and token.
3. Publish:

```bash
ovsx publish
```

## CI/CD (included)

- `.github/workflows/ci.yml`: compile and package validation on push/PR.
- `.github/workflows/release.yml`: publish on `v*` tags to VS Code Marketplace + Open VSX, then upload VSIX to GitHub Release.

Required GitHub repository secrets:

- `VSCE_PAT`
- `OVSX_PAT`

## FAQ

- **Switch does not open target IDE**: verify IDE install and URI scheme registration.
- **Cannot preserve line/column from explorer click**: open the file in editor first, then use editor context menu.
- **Extension not visible in Cursor marketplace**: make sure it was published to Open VSX.
