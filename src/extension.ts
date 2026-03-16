import * as vscode from "vscode";
import { switchTo } from "./switch";

function detectCursorHost(): boolean {
  const appName = vscode.env.appName.toLowerCase();
  const uriScheme = vscode.env.uriScheme.toLowerCase();
  return appName.includes("cursor") || uriScheme === "cursor";
}

export function activate(context: vscode.ExtensionContext): void {
  const isCursor = detectCursorHost();
  void vscode.commands.executeCommand("setContext", "switcher.isCursor", isCursor);

  const openInCursor = vscode.commands.registerCommand(
    "switcher.openInCursor",
    async (resourceUri?: vscode.Uri) => {
      await switchTo("cursor", resourceUri);
    }
  );

  const openInVSCode = vscode.commands.registerCommand(
    "switcher.openInVSCode",
    async (resourceUri?: vscode.Uri) => {
      await switchTo("vscode", resourceUri);
    }
  );

  context.subscriptions.push(openInCursor, openInVSCode);
}

export function deactivate(): void {
  // no-op
}
