import IDE_CONFIGS from "../config/ide-configs.js";
import type { IDEKey, MCPConfiguration } from "../types/index.js";
import { fileSystem } from "../utils/file-system.js";
import { logSuccess, logError, logWarning } from "../utils/logger.js";

export class MCPSetupService {
  setupIDE(ideKey: IDEKey, mcpConfigurations: MCPConfiguration[]): void {
    try {
      const config = IDE_CONFIGS[ideKey];
      if (!config) {
        throw new Error(`Unknown IDE: ${ideKey}`);
      }

      this.ensureDirectoryExists(config.dirPath);
      this.writeConfigurationFile(config.filePath, config, mcpConfigurations);

      logSuccess(
        `Configured ${config.name} with ${mcpConfigurations.length} MCP server(s)`
      );
    } catch (error) {
      logError(
        `Failed to configure ${ideKey}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      throw error;
    }
  }

  setupMultipleIDEs(
    ideKeys: IDEKey[],
    mcpConfigurations: MCPConfiguration[]
  ): void {
    const results = { success: 0, failed: 0 };

    for (const ideKey of ideKeys) {
      try {
        this.setupIDE(ideKey, mcpConfigurations);
        results.success++;
      } catch (error) {
        results.failed++;
        // Error already logged in setupIDE
      }
    }

    this.logResults(results, ideKeys.length);
  }

  private ensureDirectoryExists(dirPath: string): void {
    if (dirPath.length > 0) {
      fileSystem.ensureDirectory(dirPath);
    }
  }

  private writeConfigurationFile(
    filePath: string,
    ideConfig: any,
    mcpConfigurations: MCPConfiguration[]
  ): void {
    // Create the configuration object based on the IDE template
    const configData = this.createConfigurationFromTemplate(
      ideConfig,
      mcpConfigurations
    );

    // Write the configuration to file
    fileSystem.writeJSON(filePath, configData);
  }

  private createConfigurationFromTemplate(
    ideConfig: any,
    mcpConfigurations: MCPConfiguration[]
  ): any {
    const template = ideConfig.template;
    const configData = JSON.parse(JSON.stringify(template)); // Deep clone

    // Determine the key to use for servers based on IDE
    const serversKey = this.getServersKey(template);

    // Clear the template servers and add real configurations
    configData[serversKey] = {};

    for (const mcpConfig of mcpConfigurations) {
      const serverConfig: any = {
        command: mcpConfig.server.command,
        args: mcpConfig.server.args,
      };

      // Add environment variables if they exist
      if (mcpConfig.envValues && Object.keys(mcpConfig.envValues).length > 0) {
        serverConfig.env = mcpConfig.envValues;
      }

      // Add type field for cursor
      if (
        template.mcpServers &&
        template.mcpServers.name &&
        "type" in template.mcpServers.name
      ) {
        serverConfig.type = "stdio";
      }

      configData[serversKey][mcpConfig.serverKey] = serverConfig;
    }

    return configData;
  }

  private getServersKey(template: any): string {
    if (template.mcpServers) return "mcpServers";
    if (template.servers) return "servers";
    throw new Error("Unknown template format - no servers key found");
  }

  private logResults(
    results: { success: number; failed: number },
    total: number
  ): void {
    console.log("\n📊 Setup Results:");
    logSuccess(`Successfully configured: ${results.success}/${total} IDEs`);

    if (results.failed > 0) {
      logWarning(`Failed to configure: ${results.failed}/${total} IDEs`);
    }
  }

  getConfigurationSummary(
    ideKeys: IDEKey[],
    mcpConfigurations: MCPConfiguration[]
  ): string {
    const ideConfigurations = ideKeys
      .map((ideKey) => {
        const config = IDE_CONFIGS[ideKey];
        return `  • ${config?.name}: ${config?.filePath}`;
      })
      .join("\n");

    const mcpSummary = mcpConfigurations
      .map((mcpConfig) => {
        const envInfo = mcpConfig.envValues
          ? ` (with ${Object.keys(mcpConfig.envValues).length} env var(s))`
          : "";
        return `  • ${mcpConfig.server.name}${envInfo}`;
      })
      .join("\n");

    return `Configuration Summary:
IDEs to configure:
${ideConfigurations}

MCP Servers to install:
${mcpSummary}`;
  }
}
