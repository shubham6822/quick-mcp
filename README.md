# Setup MCP

A CLI tool to quickly set up Model Context Protocol (MCP) servers for various IDEs with multi-select functionality.

## Features

- 🚀 Quick setup for multiple IDEs
- 🔧 **Multi-select MCP servers** with environment variable support
- 📁 Automatic directory creation
- 🎯 **Smart configuration** based on IDE templates
- 🔑 **Environment variable prompting** for servers that need API keys
- 📂 **Custom path handling** for filesystem and database servers
- 🎨 Beautiful CLI interface with colors and ASCII art
- ✅ Comprehensive error handling
- 📊 Setup progress reporting

## Supported IDEs

- **Claude Code** - `.mcp.json`
- **Cursor** - `.cursor/mcp.json`
- **GitHub Copilot** - `.vscode/mcp.json`

## Supported MCP Servers

- **Playwright Browser Automation** - Web automation and testing
- **Firecrawl Web Scraping** - Web scraping with API key
- **shadcn MCP** - Browse/search/install UI components via the shadcn MCP server
- **BrowserMCP** - Example third-party MCP server for browser-related features
- **21st Magic** - Magic MCP server that requires an API key (example)
- **Serena** - capable of turning an LLM into a fully-featured agent that works directly on your codebase.
- **Context 7** - a versatile MCP server for various context-aware tasks.

## Installation

```bash
npx setup-mcp
```

## Usage

Simply run the command and follow the interactive prompts:

```bash
setup-mcp
```

The tool will:

1. Display a welcome banner
2. **Prompt you to select IDEs to configure**
3. **Prompt you to select MCP servers to install**
4. **Ask for environment variables** (API keys, connection strings, etc.) for selected servers
5. **Ask for custom paths** for servers that need them (filesystem, SQLite)
6. Show a configuration summary
7. Ask for confirmation before proceeding
8. Set up the selected IDEs with chosen MCP servers
9. Report the results

## Example Configuration Output

### Claude Code (`.mcp.json`)

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

### Cursor (`.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/files"
      ],
      "type": "stdio"
    },
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "./database.db"],
      "type": "stdio"
    }
  }
}
```

## What is MCP?

Model Context Protocol (MCP) allows AI assistants to securely access external data sources and tools. Each MCP server provides specific capabilities:

- **File System**: Access local files and directories
- **Databases**: Query PostgreSQL, SQLite databases
- **Web**: Scrape websites, make HTTP requests
- **APIs**: Integrate with GitHub, search engines, etc.
- **Automation**: Control browsers with Playwright

## Getting API Keys

Some MCP servers require API keys:

- **Firecrawl**: Sign up at [firecrawl.dev](https://firecrawl.dev)
- **GitHub**: Create a Personal Access Token in GitHub Settings
- **Brave Search**: Get API key from [brave.com/search/api](https://brave.com/search/api)

## Troubleshooting

### Permission Issues

Make sure you have write permissions in the directory where you're running the tool.

### Environment Variables Not Working

Double-check that you've entered the correct API keys and that they're valid.

### IDE Not Recognizing Configuration

- Restart your IDE after running the setup
- Check that the configuration file was created in the correct location
- Verify the JSON syntax is valid

## Support

For issues and questions:

- 🐛 [Report bugs](https://github.com/shubham6822/quick-mcp/issues)
- 💡 [Request features](https://github.com/shubham6822/quick-mcp/discussions)
- 📖 [Developer docs](./dev.md)

## License

ISC
