import { resolve } from "path";
const IDE_CONFIGS = {
  "claude-desktop": {
    name: "Claude Desktop",
    dirPath: ".claude",
    filePath: ".claude/settings.local.json",
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
  vscode: {
    name: "VS Code (with Continue extension)",
    dirPath: ".vscode",
    filePath: ".vscode/settings.local.json",
  },
};

export default IDE_CONFIGS;
