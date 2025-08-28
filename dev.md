# Developer Documentation

This document contains technical information for developers working on the Quick MCP Setup CLI tool.

## Table of Contents

- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Key Components](#key-components)
- [Development Setup](#development-setup)
- [Adding New Features](#adding-new-features)
- [Configuration](#configuration)
- [Testing](#testing)
- [Build and Deployment](#build-and-deployment)
- [TypeScript Configuration](#typescript-configuration)
- [Code Style and Conventions](#code-style-and-conventions)

## Project Structure

```
quick-mcp/
├── src/
│   ├── app.ts                     # Main application class and workflow
│   ├── index.ts                   # Entry point and CLI execution
│   ├── exports.ts                 # Public API exports
│   ├── config/                    # Configuration files
│   │   ├── constants.ts           # Application constants
│   │   ├── ide-configs.ts         # IDE configuration definitions
│   │   └── mcp-servers.ts         # MCP server definitions
│   ├── services/                  # Business logic services
│   │   ├── prompt-service.ts      # User interaction and prompts
│   │   └── mcp-setup-service.ts   # MCP configuration and file generation
│   ├── types/                     # TypeScript type definitions
│   │   └── index.ts               # Shared types and interfaces
│   └── utils/                     # Utility functions
│       ├── file-system.ts         # File system operations wrapper
│       ├── logger.ts              # Logging and display utilities
│       └── validators.ts          # Data validation helpers
├── dist/                          # Compiled JavaScript output
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # User documentation
```

## Architecture

The application follows a service-oriented architecture with clear separation of concerns:

### Core Components

1. **MCPSetupApp** (`app.ts`) - Main application orchestrator
2. **PromptService** (`services/prompt-service.ts`) - Handles user interactions
3. **MCPSetupService** (`services/mcp-setup-service.ts`) - Business logic for setup
4. **Configuration Modules** (`config/`) - Static configuration data
5. **Utilities** (`utils/`) - Shared helper functions

### Data Flow

```
User Input → PromptService → MCPSetupApp → MCPSetupService → File System
```

## Key Components

### MCPSetupApp (app.ts)

Main application class that orchestrates the entire workflow:

```typescript
export class MCPSetupApp {
  async run(): Promise<void> {
    // 1. Display banner
    // 2. Prompt for IDEs
    // 3. Prompt for MCP servers
    // 4. Collect environment variables
    // 5. Show summary and confirm
    // 6. Execute setup
  }
}
```

### PromptService (services/prompt-service.ts)

Handles all user interactions using inquirer.js:

- **promptForIDEs()** - Multi-select checkbox for IDE selection
- **promptForMCPServers()** - Multi-select MCP servers with env var collection
- **confirmAction()** - Yes/no confirmations

### MCPSetupService (services/mcp-setup-service.ts)

Core business logic for MCP setup:

- **setupMultipleIDEs()** - Orchestrates multi-IDE setup
- **createConfigurationFromTemplate()** - Generates IDE-specific config files
- **writeConfigurationFile()** - Handles file system operations

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- TypeScript knowledge

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/shubham6822/quick-mcp.git
cd quick-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev
```

### Available Scripts

```bash
npm run build      # Compile TypeScript to JavaScript
npm run dev        # Run in development mode with ts-node
npm start          # Run the compiled application
npm test           # Run tests (if configured)
```

## Adding New Features

### Adding a New IDE

1. **Update Types** (`src/types/index.ts`):

```typescript
export type IDEKey = "claude" | "cursor" | "copilot" | "newIDE";
```

2. **Add Configuration** (`src/config/ide-configs.ts`):

```typescript
const IDE_CONFIGS: Record<string, IDEConfig> = {
  // ... existing configs
  newIDE: {
    name: "New IDE Name",
    dirPath: ".newide",
    filePath: ".newide/mcp.json",
    template: {
      mcpServers: {
        name: {
          command: "COMMAND",
          args: ["ARG1", "ARG2"],
          env: { KEY: "VALUE" },
        },
      },
    },
  },
};
```

### Adding a New MCP Server

1. **Update Types** (`src/types/index.ts`):

```typescript
export type MCPServerKey = "playwright" | "firecrawl-mcp" | "newServer";
```

2. **Add Server Configuration** (`src/config/mcp-servers.ts`):

```typescript
const MCP_SERVERS: Record<string, MCPServer> = {
  // ... existing servers
  newServer: {
    name: "New Server Name",
    command: "npx",
    args: ["-y", "@new/mcp-server"],
    env: {
      API_KEY: "YOUR-API-KEY",
    },
  },
};
```

3. **Handle Custom Logic** (if needed in `src/services/prompt-service.ts`):

```typescript
// Add custom argument handling if the server needs special setup
if (serverKey === "newServer") {
  // Custom logic for collecting additional parameters
}
```

## Configuration

### IDE Configuration Structure

```typescript
interface IDEConfig {
  name: string; // Display name
  dirPath: string; // Directory to create (empty for root)
  filePath: string; // Full path to config file
  template: any; // JSON template for the config file
}
```

### MCP Server Configuration Structure

```typescript
interface MCPServer {
  name: string; // Display name
  command: string; // Command to run (usually "npx")
  args: string[]; // Command arguments
  env?: Record<string, string>; // Environment variables
}
```

### Template Patterns

Different IDEs use different configuration formats:

- **Claude**: `{ mcpServers: { ... } }`
- **Cursor**: `{ mcpServers: { ... } }` (with `type: "stdio"`)
- **VS Code/Copilot**: `{ servers: { ... } }`

## Testing

### Manual Testing

```bash
# Build and test the CLI
npm run build
npm start

# Test with different scenarios:
# 1. Select different IDE combinations
# 2. Choose servers with/without env vars
# 3. Test custom path servers (filesystem, sqlite)
# 4. Verify generated config files
```

### Test Cases to Cover

1. **IDE Selection**: Single vs multiple IDEs
2. **Server Selection**: Servers with/without environment variables
3. **Environment Variables**: Valid/invalid inputs
4. **File Generation**: Correct JSON structure for each IDE
5. **Error Handling**: Invalid paths, missing permissions
6. **Custom Paths**: Filesystem and SQLite server path handling

## Build and Deployment

### Build Process

```bash
npm run build
```

This compiles TypeScript files from `src/` to `dist/` with:

- Source maps for debugging
- Declaration files for type checking
- ES modules output

### Distribution

The package is distributed via npm:

```bash
# For global installation
npm install -g setup-mcp

# For one-time use
npx setup-mcp
```

## TypeScript Configuration

The project uses strict TypeScript settings (`tsconfig.json`):

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "nodenext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Important Type Considerations

- **exactOptionalPropertyTypes**: Optional properties cannot be assigned `undefined`
- **noUncheckedIndexedAccess**: Array/object access returns `T | undefined`
- **strict**: All strict type checking enabled

## Code Style and Conventions

### File Naming

- Use kebab-case for file names: `mcp-setup-service.ts`
- Use PascalCase for class names: `MCPSetupService`
- Use camelCase for functions and variables: `promptForIDEs`

### Import/Export Patterns

```typescript
// Named exports for multiple items
export { PromptService, MCPSetupService };

// Default exports for main modules
export default MCP_SERVERS;

// Import with .js extension (required for ES modules)
import { fileSystem } from "../utils/file-system.js";
```

### Error Handling

```typescript
try {
  // risky operation
} catch (error) {
  logError(
    `Context: ${error instanceof Error ? error.message : "Unknown error"}`
  );
  throw error; // Re-throw for upstream handling
}
```

### Async/Await

- Always use async/await over Promises
- Handle errors at appropriate levels
- Use proper typing for async functions

## Debugging

### Common Issues

1. **Module Resolution**: Ensure `.js` extensions in imports
2. **Type Errors**: Check `exactOptionalPropertyTypes` compliance
3. **File Permissions**: Ensure write access to target directories
4. **Environment Variables**: Validate required env vars are provided

### Debug Mode

Add logging to debug issues:

```typescript
import { logInfo } from "../utils/logger.js";

logInfo(`Debug: ${JSON.stringify(data, null, 2)}`);
```

## Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for new features
3. Update this documentation for architectural changes
4. Test manually with various IDE/server combinations
5. Ensure backward compatibility when modifying exports

## Future Enhancements

Potential areas for improvement:

1. **Unit Tests**: Add comprehensive test suite
2. **Configuration Validation**: JSON schema validation
3. **Server Health Checks**: Verify MCP servers work after setup
4. **Custom Templates**: Allow users to define custom IDE templates
5. **Backup/Restore**: Backup existing configs before overwriting
6. **Dry Run Mode**: Preview changes without writing files
7. **Interactive Updates**: Update existing configurations
8. **Plugin System**: Allow third-party MCP server definitions
