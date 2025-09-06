import MCP_SERVERS from "../../config/mcpConfigs.js";
import {
    IDEKeyEnum,
    MCPServerKeyEnum,
    type IDEKey,
    type MCPServer,
} from "../../exports.js";

export class BrowserMCPService {
    private mcpConfig: MCPServer;

    constructor() {
        this.mcpConfig = MCP_SERVERS[MCPServerKeyEnum.BROWSER_MCP];
        if (!this.mcpConfig) {
            throw new Error("MCP server not found");
        }
    }

    getBrowserMCPConfig(selectedIDEs: IDEKey) {
        const config = {};
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

    private getClaudeConfig(ide: IDEKey) {
        return {
            [MCPServerKeyEnum.BROWSER_MCP]: {
                command: this.mcpConfig.command,
                args: this.mcpConfig.args,
            },
        };
    }

    private getCursorConfig(ide: IDEKey) {
        return {
            [MCPServerKeyEnum.BROWSER_MCP]: {
                command: this.mcpConfig.command,
                args: this.mcpConfig.args,
                type: "stdio",
            },
        };
    }

    private getCopilotConfig(ide: IDEKey) {
        return {
            [MCPServerKeyEnum.BROWSER_MCP]: {
                command: this.mcpConfig.command,
                args: this.mcpConfig.args,
            },
        };
    }
}
