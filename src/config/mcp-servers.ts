import type { MCPServer } from "../types/index.js";

const MCP_SERVERS: Record<string, MCPServer> = {
  playwright: {
    name: "Playwright Browser Automation",
    command: "npx",
    args: ["@playwright/mcp@latest"],
  },
  "firecrawl-mcp": {
    name: "Firecrawl Web Scraping",
    command: "npx",
    args: ["-y", "firecrawl-mcp"],
    env: {
      FIRECRAWL_API_KEY: "YOUR-API-KEY",
    },
  },
  filesystem: {
    name: "File System Operations",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-filesystem", "CUSTOM_PATH"],
  },
  postgres: {
    name: "PostgreSQL Database",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-postgres"],
    env: {
      POSTGRES_CONNECTION_STRING:
        "postgresql://user:password@localhost:5432/database",
    },
  },
  sqlite: {
    name: "SQLite Database",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-sqlite", "CUSTOM_DB_PATH"],
  },
  fetch: {
    name: "HTTP Fetch Operations",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-fetch"],
  },
  github: {
    name: "GitHub Integration",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-github"],
    env: {
      GITHUB_PERSONAL_ACCESS_TOKEN: "YOUR-GITHUB-TOKEN",
    },
  },
  brave: {
    name: "Brave Search",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-brave-search"],
    env: {
      BRAVE_API_KEY: "YOUR-BRAVE-API-KEY",
    },
  },
} as const;

export default MCP_SERVERS;
