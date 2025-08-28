import type { IDEConfig, MCPEntry } from "../types/index.js";

export function validateIDEConfig(config: unknown): config is IDEConfig {
  if (!config || typeof config !== "object") {
    return false;
  }

  const c = config as Record<string, unknown>;
  return (
    typeof c.name === "string" &&
    typeof c.dirPath === "string" &&
    typeof c.filePath === "string"
  );
}

export function createMCPEntry(
  message: string = "Hello from setup-mcp CLI 🎉"
): MCPEntry {
  return {
    message,
    timestamp: new Date().toISOString(),
  };
}

export function normalizeJSONData(data: unknown): unknown[] {
  if (Array.isArray(data)) {
    return data;
  }
  if (data === null || data === undefined) {
    return [];
  }
  return [data];
}
