/**
 * Dev-only trace helper for debugging list actions in Metro / device logs.
 */
export function ddlLog(scope: string, message: string, data?: unknown): void {
  if (!__DEV__) {
    return;
  }
  if (data !== undefined) {
    console.log(`[DDL:${scope}]`, message, data);
  } else {
    console.log(`[DDL:${scope}]`, message);
  }
}
