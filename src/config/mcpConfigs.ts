import { MCPServerKeyEnum, type MCPServer } from "../types/index.js";

const MCP_SERVERS: Record<MCPServerKeyEnum, MCPServer> = {
  [MCPServerKeyEnum.PLAYWRIGHT]: {
    name: "Playwright ",
    command: "npx",
    apiKey: false,
    args: ["@playwright/mcp@latest"],
  },
  [MCPServerKeyEnum.FIRECRAWL_MCP]: {
    name: "Firecrawl",
    command: "npx",
    apiKey: true,
    args: ["-y", "firecrawl-mcp"],
    env: {
      FIRECRAWL_API_KEY: "YOUR-API-KEY",
    },
    link: "https://www.firecrawl.dev/",
  },
  [MCPServerKeyEnum.CONTEXT7_MCP]: {
    name: "Context7",
    command: "npx",
    apiKey: true,
    args: ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"],
    link: "https://context7.com/",
  },
} as const;

export default MCP_SERVERS;
