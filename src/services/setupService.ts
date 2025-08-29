import IDE_CONFIGS from "../config/ideConfigs.js";
import {
  MCPServerKeyEnum,
  type IDEKey,
  type MCPServer,
  type MCPServerKey,
} from "../types/index.js";
import { fileSystem } from "../utils/file-system.js";
import { logSuccess, logError, logWarning } from "../utils/logger.js";
import { PlaywrightService } from "./mcp/playwright.js";

export class MCPSetupService {
  private playwrightService: PlaywrightService;

  constructor() {
    this.playwrightService = new PlaywrightService();
  }

  setupIDE(ideKey: IDEKey, mcpServerKeys: MCPServerKey[]): void {
    try {
      const ideConfig = IDE_CONFIGS[ideKey];

      if (!ideConfig) {
        throw new Error(`Unknown IDE: ${ideKey}`);
      }

      this.ensureDirectoryExists(ideConfig.dirPath);
      this.writeConfigurationFile(ideKey, mcpServerKeys);
    } catch (error) {
      logError(
        `Failed to configure ${ideKey}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      throw error;
    }
  }

  setupMultipleIDEs(ideKeys: IDEKey[], mcpServerkeys: MCPServerKey[]): void {
    const results = { success: 0, failed: 0 };

    for (const ideKey of ideKeys) {
      try {
        this.setupIDE(ideKey, mcpServerkeys);
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
    ideKey: IDEKey,
    MCPServerKeys: MCPServerKey[]
  ): void {
    // Create the configuration object based on the IDE template
    const configData = this.createConfigurationFromTemplate(
      ideKey,
      MCPServerKeys
    );
    if (!IDE_CONFIGS[ideKey]) {
      throw new Error(`Unknown IDE: ${ideKey}`);
    }

    // Write the configuration to file
    fileSystem.writeJSON(IDE_CONFIGS[ideKey].filePath, configData);
  }

  private createConfigurationFromTemplate(
    ideKey: IDEKey,
    MCPServerKeys: MCPServerKey[]
  ): any {
    if (!IDE_CONFIGS[ideKey]) {
      throw new Error(`Unknown IDE: ${ideKey}`);
    }

    const template = IDE_CONFIGS[ideKey].template;
    const configData = JSON.parse(JSON.stringify(template));

    // Determine the key to use for servers based on IDE
    const serversKey = this.getServersKey(template);

    // Clear the template servers and add real configurations
    configData[serversKey] = {};

    for (const mcpServerKey of MCPServerKeys) {
      const configJson = this.getJSONConfig(ideKey, mcpServerKey);
      configData[serversKey] = configJson;
    }
    return configData;
  }

  private getServersKey(template: any): string {
    if (template.mcpServers) return "mcpServers";
    if (template.servers) return "servers";
    throw new Error("Unknown template format - no servers key found");
  }

  private getJSONConfig(ideKey: IDEKey, mcpServerKey: MCPServerKey): any {
    switch (mcpServerKey) {
      case MCPServerKeyEnum.PLAYWRIGHT:
        return this.playwrightService.getPlaywrightConfig(ideKey);
      // case MCPServerKeyEnum.CONTEXT7_MCP:
      //   return this.context7Service.getContext7Config(ideKey);
      // case MCPServerKeyEnum.FIRECRAWL_MCP:
      //   return this.firecrawlService.getFirecrawlConfig(ideKey);
      default:
        throw new Error(`Unknown MCP Server: ${mcpServerKey}`);
    }
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
}
