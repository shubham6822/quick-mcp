export const APP_CONFIG = {
  name: "Setup MCP",
  version: "1.0.0",
  description: "Set up Model Context Protocol servers for your IDEs",
  bannerFont: "ANSI Shadow",
} as const;

export const FILE_EXTENSIONS = {
  json: ".json",
  typescript: ".ts",
  javascript: ".js",
} as const;

export const DEFAULT_MESSAGES = {
  welcome: "Hello from setup-mcp CLI 🎉",
  success: "Configuration completed successfully!",
  cancelled: "Configuration cancelled by user.",
  noSelection: "No IDEs selected. Exiting...",
} as const;

export const ERROR_MESSAGES = {
  unknownIDE: (ide: string) => `Unknown IDE: ${ide}`,
  fileReadError: (path: string) =>
    `Could not read existing ${path}, starting fresh.`,
  fileWriteError: (path: string) => `Error writing to ${path}`,
  setupError: (ide: string, error: string) =>
    `Failed to configure ${ide}: ${error}`,
} as const;
