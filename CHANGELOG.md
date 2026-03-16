# Changelog

All notable changes to this project will be documented in this file.

## [0.1.2] - 2026-03-16

- Add Logo picture.
- Fix context-menu target detection in Cursor.
- Activate extension on startup (`onStartupFinished`) to ensure menu context is initialized before first right-click.
- Improve host detection by checking both `vscode.env.appName` and `vscode.env.uriScheme`.

## [0.1.0] - 2026-03-16

- Initial release.
- Added `Switch: Open in Cursor` command.
- Added `Switch: Open in VS Code` command.
- Implemented file + line + column deep-link switching.
- Added CI and release workflow templates for VS Code Marketplace and Open VSX.
