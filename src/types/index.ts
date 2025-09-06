export interface IDEConfig {
  name: string;
  dirPath: string;
  filePath: string;
  template: Record<string, any>;
}

export interface MCPServer {
  name: string;
  command: string;
  args: string[];
  apiKey: boolean;
  link?: string;
  env?: Record<string, string>;
}

export interface MCPEntry {
  message: string;
  timestamp: string;
}

export type IDEKey = "claude" | "cursor" | "copilot";
export type MCPServerKey =
  | "playwright"
  | "firecrawl-mcp"
  | "context7-mcp"
  | "shadcn-mcp"
  | "browsermcp"
  | "magic-mcp"
  | "serena-mcp";

export enum IDEKeyEnum {
  CLAUDE = "claude",
  CURSOR = "cursor",
  COPILOT = "copilot",
}

export enum MCPServerKeyEnum {
  PLAYWRIGHT = "playwright",
  FIRECRAWL_MCP = "firecrawl-mcp",
  CONTEXT7_MCP = "context7-mcp",
  SHADCN_MCP = "shadcn-mcp",
  BROWSER_MCP = "browsermcp",
  MAGIC_MCP = "magic-mcp",
  SERENA_MCP = "serena-mcp",
}

export interface SetupOptions {
  selectedIDEs: IDEKey[];
  selectedServers: MCPServerKey[];
  envVariables?: Record<string, Record<string, string>>;
}

export interface MCPConfiguration {
  serverKey: MCPServerKey;
  server: MCPServer;
  envValues?: Record<string, string>;
}

export interface FileSystemOperations {
  ensureDirectory(path: string): void;
  readJSON<T>(path: string): T | null;
  writeJSON(path: string, data: unknown): void;
  fileExists(path: string): boolean;
}
