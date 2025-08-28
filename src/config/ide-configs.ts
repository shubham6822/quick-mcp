import type { IDEConfig } from "../types/index.js";

const IDE_CONFIGS: Record<string, IDEConfig> = {
  claude: {
    name: "Claude Code",
    dirPath: "",
    filePath: ".mcp.json",
    template: {
      mcpServers: {
        name: {
          command: "COMMAND",
          args: ["ARG1", "ARG2"],
          env: {
            KEY: "VALUE",
          },
        },
      },
    },
  },
  cursor: {
    name: "Cursor",
    dirPath: ".cursor",
    filePath: ".cursor/mcp.json",
    template: {
      mcpServers: {
        name: {
          type: "string",
          command: "COMMAND",
          args: ["ARG1", "ARG2"],
          env: {
            KEY: "VALUE",
          },
        },
      },
    },
  },
  copilot: {
    name: "GitHub Copilot",
    dirPath: ".vscode",
    filePath: ".vscode/mcp.json",
    template: {
      servers: {
        name: {
          command: "COMMAND",
          args: ["ARG1", "ARG2"],
          env: {
            KEY: "VALUE",
          },
        },
      },
    },
  },
} as const;

export default IDE_CONFIGS;
