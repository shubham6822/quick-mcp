# Setup MCP Setup

A CLI tool to quickly set up Model Context Protocol (MCP) servers for various IDEs.

## Features

- 🚀 Quick setup for multiple IDEs
- 📁 Automatic directory creation
- 🔧 Configurable MCP servers
- 🎨 Beautiful CLI interface with colors and ASCII art
- ✅ Comprehensive error handling
- 📊 Setup progress reporting

## Supported IDEs

- **Claude Code** - `.mcp.json`
- **Cursor** - `.cursor/mcp.json`
- **Windsurf** - `.windsurf/settings.local.json`
- **Zed** - `.zed/settings.local.json`
- **GitHub Copilot** - `.vscode/mcp.json`

## Installation

```bash
npm install -g setup-mcp
```

Or run directly with npx:

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
2. Prompt you to select IDEs to configure
3. Show a configuration summary
4. Ask for confirmation before proceeding
5. Set up the selected IDEs
6. Report the results

## Development

### Project Structure

```
src/
├── app.ts                     # Main application class
├── index.ts                   # Entry point
├── exports.ts                 # Public API exports
├── config/                    # Configuration files
│   ├── constants.ts           # App constants
│   ├── ide-configs.ts         # IDE configuration definitions
│   └── mcp-servers.ts         # MCP server definitions
├── services/                  # Business logic services
│   ├── prompt-service.ts      # User interaction prompts
│   └── mcp-setup-service.ts   # MCP setup logic
├── types/                     # TypeScript type definitions
│   └── index.ts               # Shared types and interfaces
├── utils/                     # Utility functions
│   ├── file-system.ts         # File system operations
│   ├── logger.ts              # Logging and display utilities
│   └── validators.ts          # Data validation helpers
├── ide/                       # Legacy compatibility (deprecated)
│   ├── index.ts               # Legacy prompt export
│   └── IDE_CONFIGS.ts         # Legacy config export
└── mcp/                       # Legacy compatibility (deprecated)
    └── MCP_SERVER.ts          # Legacy server export
```

### Key Improvements

1. **Separation of Concerns**: Clear separation between configuration, services, utilities, and types
2. **Type Safety**: Comprehensive TypeScript types and interfaces
3. **Error Handling**: Robust error handling throughout the application
4. **Modularity**: Highly modular architecture for easy maintenance and testing
5. **Backward Compatibility**: Legacy exports maintained for existing integrations
6. **Constants Management**: Centralized configuration and constants
7. **Service Architecture**: Clean service-based architecture

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

## Configuration

### Adding New IDEs

To add support for a new IDE, update `src/config/ide-configs.ts`:

```typescript
export const IDE_CONFIGS = {
  // ... existing configs
  myNewIDE: {
    name: "My New IDE",
    dirPath: ".mynewide",
    filePath: ".mynewide/config.json",
  },
};
```

### Adding New MCP Servers

To add new MCP servers, update `src/config/mcp-servers.ts`:

```typescript
export const MCP_SERVERS = {
  // ... existing servers
  myServer: {
    name: "My Custom Server",
    command: "npx",
    args: ["-y", "@my/mcp-server"],
    env: {
      MY_API_KEY: "your-api-key-here",
    },
  },
};
```

## Architecture Benefits

- **Maintainability**: Clear file organization and separation of concerns
- **Extensibility**: Easy to add new IDEs, servers, or features
- **Testability**: Modular design enables easy unit testing
- **Type Safety**: Full TypeScript coverage with proper type definitions
- **Error Resilience**: Comprehensive error handling and user feedback
- **Developer Experience**: Clear structure with helpful utilities and services

## License

ISC
