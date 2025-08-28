import type { IDEConfig } from "../types/index.js";

const IDE_CONFIGS: Record<string, IDEConfig> = {
  claude: {
    name: "Claude Code",
    dirPath: "",
    filePath: ".mcp.json",
  },
  cursor: {
    name: "Cursor",
    dirPath: ".cursor",
    filePath: ".cursor/mcp.json",
  },
  windsurf: {
    name: "Windsurf",
    dirPath: ".windsurf",
    filePath: ".windsurf/settings.local.json",
  },
  zed: {
    name: "Zed",
    dirPath: ".zed",
    filePath: ".zed/settings.local.json",
  },
  copilot: {
    name: "GitHub Copilot",
    dirPath: ".vscode",
    filePath: ".vscode/mcp.json",
  },
} as const;

export default IDE_CONFIGS;
