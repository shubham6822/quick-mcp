import IDE_CONFIGS from "../config/ideConfigs.js";
import {
  MCPServerKeyEnum,
  type IDEKey,
  type MCPServer,
  type MCPServerKey,
} from "../types/index.js";
import { fileSystem } from "../utils/file-system.js";
import { logSuccess, logError, logWarning } from "../utils/logger.js";
import { Context7Service } from "./mcp/context7.js";
import { FirecrawlService } from "./mcp/firecrawl.js";
import { PlaywrightService } from "./mcp/playwright.js";
import { SerenaService } from "./mcp/serena.js";
import { ShadcnService } from "./mcp/shadcn.js";
import { BrowserMCPService } from "./mcp/browsermcp.js";
import { MagicService } from "./mcp/magic.js";

export class MCPSetupService {
  private playwrightService: PlaywrightService;
  private context7Service: Context7Service;
  private firecrawlService: FirecrawlService;
  private serenaService: SerenaService;
  private shadcnService: ShadcnService;
  private browserMCPService: BrowserMCPService;
  private magicService: MagicService;

  constructor() {
    this.playwrightService = new PlaywrightService();
    this.context7Service = new Context7Service();
    this.firecrawlService = new FirecrawlService();
    this.serenaService = new SerenaService();
    this.shadcnService = new ShadcnService();
    this.browserMCPService = new BrowserMCPService();
    this.magicService = new MagicService();
  }

  async setupIDE(ideKey: IDEKey, mcpServerKeys: MCPServerKey[]): Promise<void> {
    try {
      const ideConfig = IDE_CONFIGS[ideKey];

      if (!ideConfig) {
        throw new Error(`Unknown IDE: ${ideKey}`);
      }

      this.ensureDirectoryExists(ideConfig.dirPath);
      await this.writeConfigurationFile(ideKey, mcpServerKeys);
    } catch (error) {
      logError(
        `Failed to configure ${ideKey}: ${error instanceof Error ? error.message : "Unknown error"
        }`
      );
      throw error;
    }
  }

  async setupMultipleIDEs(
    ideKeys: IDEKey[],
    mcpServerkeys: MCPServerKey[]
  ): Promise<void> {
    const results = { success: 0, failed: 0 };

    for (const ideKey of ideKeys) {
      try {
        await this.setupIDE(ideKey, mcpServerkeys);
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

  private async writeConfigurationFile(
    ideKey: IDEKey,
    MCPServerKeys: MCPServerKey[]
  ): Promise<void> {
    // Create the configuration object based on the IDE template
    const configData = await this.createConfigurationFromTemplate(
      ideKey,
      MCPServerKeys
    );
    if (!IDE_CONFIGS[ideKey]) {
      throw new Error(`Unknown IDE: ${ideKey}`);
    }

    // Write the configuration to file
    fileSystem.writeJSON(IDE_CONFIGS[ideKey].filePath, configData);
  }

  private async createConfigurationFromTemplate(
    ideKey: IDEKey,
    MCPServerKeys: MCPServerKey[]
  ): Promise<any> {
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
      const configJson = await this.getJSONConfig(ideKey, mcpServerKey);
      Object.assign(configData[serversKey], configJson);
    }
    return configData;
  }

  private getServersKey(template: any): string {
    if (template.mcpServers) return "mcpServers";
    if (template.servers) return "servers";
    throw new Error("Unknown template format - no servers key found");
  }

  private async getJSONConfig(
    ideKey: IDEKey,
    mcpServerKey: MCPServerKey
  ): Promise<any> {
    switch (mcpServerKey) {
      case MCPServerKeyEnum.PLAYWRIGHT:
        return this.playwrightService.getPlaywrightConfig(ideKey);
      case MCPServerKeyEnum.CONTEXT7_MCP:
        return await this.context7Service.getContext7Config(ideKey);
      case MCPServerKeyEnum.SHADCN_MCP:
        return this.shadcnService.getShadcnConfig(ideKey);
      case MCPServerKeyEnum.BROWSER_MCP:
        return this.browserMCPService.getBrowserMCPConfig(ideKey);
      case MCPServerKeyEnum.MAGIC_MCP:
        return await this.magicService.getMagicConfig(ideKey);
      case MCPServerKeyEnum.FIRECRAWL_MCP:
        return await this.firecrawlService.getFirecrawlConfig(ideKey);
      case MCPServerKeyEnum.SERENA_MCP:
        return await this.serenaService.getSerenaConfig(ideKey);
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
