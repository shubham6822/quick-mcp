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
  [MCPServerKeyEnum.SHADCN_MCP]: {
    name: "ShadCN",
    command: "npx",
    apiKey: false,
    args: ["shadcn@latest", "mcp"],
    link: "https://ui.shadcn.com/",
  },
  [MCPServerKeyEnum.BROWSER_MCP]: {
    name: "BrowserMCP",
    command: "npx",
    apiKey: false,
    args: ["@browsermcp/mcp@latest"],
    link: "https://github.com/browsermcp",
  },
  [MCPServerKeyEnum.MAGIC_MCP]: {
    name: "21st Magic",
    command: "npx",
    apiKey: true,
    args: ["-y", "@21st-dev/magic@latest", "API_KEY=\"your-api-key\""],
    link: "https://github.com/21st-dev/magic",
  },
  [MCPServerKeyEnum.SERENA_MCP]: {
    name: "Serena",
    command: "uvx",
    apiKey: false,
    args: ["--from", "git+https://github.com/oraios/serena", "serena", "start-mcp-server"],
    link: "https://github.com/oraios/serena",
  },
} as const;

export default MCP_SERVERS;
