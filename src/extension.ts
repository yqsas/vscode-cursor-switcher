import * as vscode from "vscode";
import { switchTo } from "./switch";

export function activate(context: vscode.ExtensionContext): void {
  const appName = vscode.env.appName.toLowerCase();
  const isCursor = appName.includes("cursor");
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
