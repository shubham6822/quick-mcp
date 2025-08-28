export interface IDEConfig {
  name: string;
  dirPath: string;
  filePath: string;
}

export interface MCPServer {
  name: string;
  command: string;
  args: string[];
  env?: Record<string, string>;
}

export interface MCPEntry {
  message: string;
  timestamp: string;
}

export type IDEKey = "claude" | "cursor" | "windsurf" | "zed" | "copilot";

export interface SetupOptions {
  selectedIDEs: IDEKey[];
  selectedServers?: string[];
}

export interface FileSystemOperations {
  ensureDirectory(path: string): void;
  readJSON<T>(path: string): T | null;
  writeJSON(path: string, data: unknown): void;
  fileExists(path: string): boolean;
}
