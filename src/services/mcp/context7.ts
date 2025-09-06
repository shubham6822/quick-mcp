import inquirer from "inquirer";
import MCP_SERVERS from "../../config/mcpConfigs.js";
import {
  IDEKeyEnum,
  logInfo,
  MCPServerKeyEnum,
  type IDEKey,
  type MCPServer,
} from "../../exports.js";

export class Context7Service {
  private mcpConfig: MCPServer;
  private apiKey = "";
  private apiKeyPrompted = false;

  constructor() {
    this.mcpConfig = MCP_SERVERS[MCPServerKeyEnum.CONTEXT7_MCP];
    if (!this.mcpConfig) {
      throw new Error("MCP server not found");
    }
  }

  async getContext7Config(selectedIDEs: IDEKey): Promise<any> {
    const config = {};

    // Only prompt for API key if we haven't already
    if (!this.apiKeyPrompted) {
      this.apiKey = await this.promptForAPIKey(selectedIDEs);
      this.apiKeyPrompted = true;
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
    const args = this.mcpConfig.args.map((arg) =>
      arg === "YOUR_API_KEY" ? this.apiKey : arg
    );

    return {
      [MCPServerKeyEnum.CONTEXT7_MCP]: {
        command: this.mcpConfig.command,
        args: args,
      },
    };
  }

  private getCursorConfig(ideKey: IDEKey): any {
    const args = this.mcpConfig.args.map((arg) =>
      arg === "YOUR_API_KEY" ? this.apiKey : arg
    );

    return {
      [MCPServerKeyEnum.CONTEXT7_MCP]: {
        command: this.mcpConfig.command,
        args: args,
      },
    };
  }

  private getCopilotConfig(ideKey: IDEKey): any {
    const args = this.mcpConfig.args.map((arg) =>
      arg === "YOUR_API_KEY" ? this.apiKey : arg
    );

    return {
      [MCPServerKeyEnum.CONTEXT7_MCP]: {
        command: this.mcpConfig.command,
        args: args,
      },
    };
  }

  private async promptForAPIKey(ideKey: IDEKey): Promise<string> {
    logInfo(`Get your API key at: ${this.mcpConfig.link}`);
    const envAnswer = await inquirer.prompt({
      type: "input",
      name: "apiKey",
      message: `Enter API key for ${this.mcpConfig.name} :`,
      validate: (input: string) => {
        if (!input.trim()) {
          return `${this.mcpConfig.name} is required for ${this.mcpConfig.name}`;
        }
        return true;
      },
    });
    return envAnswer.apiKey;
  }
}
