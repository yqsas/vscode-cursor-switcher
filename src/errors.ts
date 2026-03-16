export const MSG = {
  noActiveEditor: "No active editor found.",
  unsupportedDocument:
    "Only saved local files are supported. Please save the file first.",
  openFailed:
    "Failed to open target editor. Check whether the target editor is installed and URI association is available."
} as const;

export function toErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }
  return "Unknown error";
}
