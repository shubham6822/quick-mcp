import type { MCPServer } from "../types/index.js";

const MCP_SERVERS: Record<string, MCPServer> = {
  filesystem: {
    name: "Filesystem",
    command: "npx",
    args: [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "/path/to/allowed/directory",
    ],
  },
  github: {
    name: "GitHub",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-github"],
    env: {
      GITHUB_PERSONAL_ACCESS_TOKEN: "your-token-here",
    },
  },
  gitlab: {
    name: "GitLab",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-gitlab"],
    env: {
      GITLAB_PERSONAL_ACCESS_TOKEN: "your-token-here",
      GITLAB_API_URL: "https://gitlab.com/api/v4",
    },
  },
  "google-drive": {
    name: "Google Drive",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-gdrive"],
    env: {
      GDRIVE_SERVICE_ACCOUNT_KEY_FILE: "/path/to/service-account-key.json",
    },
  },
  slack: {
    name: "Slack",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-slack"],
    env: {
      SLACK_BOT_TOKEN: "xoxb-your-bot-token",
      SLACK_TEAM_ID: "your-team-id",
    },
  },
  postgres: {
    name: "PostgreSQL",
    command: "npx",
    args: [
      "-y",
      "@modelcontextprotocol/server-postgres",
      "postgresql://localhost/mydb",
    ],
  },
  sqlite: {
    name: "SQLite",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-sqlite", "/path/to/database.db"],
  },
  puppeteer: {
    name: "Puppeteer (Web Scraping)",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-puppeteer"],
  },
  "brave-search": {
    name: "Brave Search",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-brave-search"],
    env: {
      BRAVE_API_KEY: "your-api-key-here",
    },
  },
  memory: {
    name: "Memory",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-memory"],
  },
} as const;

export default MCP_SERVERS;
