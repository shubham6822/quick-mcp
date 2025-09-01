import inquirer from "inquirer";
import MCP_SERVERS from "../../config/mcpConfigs.js";
import {
  IDEKeyEnum,
  logInfo,
  MCPServerKeyEnum,
  type IDEKey,
  type MCPServer,
} from "../../exports.js";

export class SerenaService {
  private mcpConfig: MCPServer;
  private projectPath = "";
  private context = "desktop-app";
  private configPrompted = false;

  constructor() {
    this.mcpConfig = MCP_SERVERS[MCPServerKeyEnum.SERENA_MCP];
    if (!this.mcpConfig) {
      throw new Error("MCP server not found");
    }
  }

  async getSerenaConfig(selectedIDEs: IDEKey): Promise<any> {
    const config = {};

    // Only prompt for configuration if we haven't already
    if (!this.configPrompted) {
      await this.promptForConfiguration(selectedIDEs);
      this.configPrompted = true;
    }

    // Iterate over the selected IDEs and merge their configurations
    switch (selectedIDEs) {
      case IDEKeyEnum.CLAUDE:
        Object.assign(config, this.getClaudeConfig(selectedIDEs));
        break;
      case IDEKeyEnum.CURSOR:
        Object.assign(config, this.getCursorConfig(selectedIDEs));
        break;
      case IDEKeyEnum.COPILOT:
        Object.assign(config, this.getCopilotConfig(selectedIDEs));
        break;
    }

    return config;
  }

  private getClaudeConfig(ideKey: IDEKey): any {
    const args = [...this.mcpConfig.args];
    
    // Add context for desktop app (Claude Desktop)
    args.push("--context", "desktop-app");
    
    // Add project path if provided
    if (this.projectPath) {
      args.push("--project", this.projectPath);
    }

    return {
      [MCPServerKeyEnum.SERENA_MCP]: {
        command: this.mcpConfig.command,
        args: args,
      },
    };
  }

  private getCursorConfig(ideKey: IDEKey): any {
    const args = [...this.mcpConfig.args];
    
    // Add context for IDE assistant (Cursor)
    args.push("--context", "ide-assistant");
    
    // Add project path if provided
    if (this.projectPath) {
      args.push("--project", this.projectPath);
    }

    return {
      [MCPServerKeyEnum.SERENA_MCP]: {
        command: this.mcpConfig.command,
        args: args,
        type: "stdio",
      },
    };
  }

  private getCopilotConfig(ideKey: IDEKey): any {
    const args = [...this.mcpConfig.args];
    
    // Add context for IDE assistant
    args.push("--context", "ide-assistant");
    
    // Add project path if provided
    if (this.projectPath) {
      args.push("--project", this.projectPath);
    }

    return {
      [MCPServerKeyEnum.SERENA_MCP]: {
        command: this.mcpConfig.command,
        args: args,
      },
    };
  }

  private async promptForConfiguration(ideKey: IDEKey): Promise<void> {
    logInfo(`Serena is a powerful coding agent toolkit. Learn more at: ${this.mcpConfig.link}`);
    
    // Prompt for project path (optional)
    const projectAnswer = await inquirer.prompt({
      type: "input",
      name: "projectPath",
      message: "Enter the project path for Serena (optional, press Enter to skip):",
      default: "",
    });
    
    this.projectPath = projectAnswer.projectPath;
    
    // Set context based on IDE
    switch (ideKey) {
      case IDEKeyEnum.CLAUDE:
        this.context = "desktop-app";
        break;
      case IDEKeyEnum.CURSOR:
      case IDEKeyEnum.COPILOT:
        this.context = "ide-assistant";
        break;
      default:
        this.context = "desktop-app";
    }
    
    logInfo(`Serena will use context: ${this.context}`);
  }
}