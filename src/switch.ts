import * as vscode from "vscode";
import { MSG, toErrorMessage } from "./errors";

type TargetIde = "cursor" | "vscode";
type Location = { filePath: string; line: number; column: number };

function toSlashPath(fsPath: string): string {
  return fsPath.replace(/\\/g, "/");
}

function buildDeepLink(
  target: TargetIde,
  filePath: string,
  line: number,
  column: number
): vscode.Uri {
  const scheme = target === "cursor" ? "cursor" : "vscode";
  const normalizedPath = encodeURI(toSlashPath(filePath));
  const raw = `${scheme}://file/${normalizedPath}:${line}:${column}`;
  return vscode.Uri.parse(raw);
}

function getCurrentLocation(editor: vscode.TextEditor): Location | null {
  const docUri = editor.document.uri;
  if (docUri.scheme !== "file") {
    return null;
  }

  const line = editor.selection.active.line + 1;
  const column = editor.selection.active.character + 1;
  return { filePath: docUri.fsPath, line, column };
}

function getLocationFromExplorerSelection(resourceUri?: vscode.Uri): Location | null {
  if (!resourceUri || resourceUri.scheme !== "file") {
    return null;
  }

  const activeEditor = vscode.window.activeTextEditor;
  if (
    activeEditor &&
    activeEditor.document.uri.scheme === "file" &&
    activeEditor.document.uri.fsPath === resourceUri.fsPath
  ) {
    const fromEditor = getCurrentLocation(activeEditor);
    if (fromEditor) {
      return fromEditor;
    }
  }

  return { filePath: resourceUri.fsPath, line: 1, column: 1 };
}

function resolveLocation(resourceUri?: vscode.Uri): Location | null {
  const explorerLocation = getLocationFromExplorerSelection(resourceUri);
  if (explorerLocation) {
    return explorerLocation;
  }

  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return null;
  }

  return getCurrentLocation(activeEditor);
}

export async function switchTo(
  target: TargetIde,
  resourceUri?: vscode.Uri
): Promise<void> {
  const location = resolveLocation(resourceUri);
  if (!location) {
    if (resourceUri && resourceUri.scheme !== "file") {
      void vscode.window.showWarningMessage(MSG.unsupportedDocument);
      return;
    }
    void vscode.window.showWarningMessage(MSG.noActiveEditor);
    return;
  }

  const uri = buildDeepLink(
    target,
    location.filePath,
    location.line,
    location.column
  );

  try {
    const opened = await vscode.env.openExternal(uri);
    if (!opened) {
      void vscode.window.showErrorMessage(MSG.openFailed);
      return;
    }

    const config = vscode.workspace.getConfiguration("switcher");
    if (config.get<boolean>("showSuccessMessage", false)) {
      void vscode.window.showInformationMessage(
        `Opened in ${target === "cursor" ? "Cursor" : "VS Code"}.`
      );
    }
  } catch (error) {
    void vscode.window.showErrorMessage(`${MSG.openFailed} (${toErrorMessage(error)})`);
  }
}
