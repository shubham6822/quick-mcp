import { PromptService } from "./services/promptService.js";
import { MCPSetupService } from "./services/setupService.js";
import { displayBanner, logInfo, logError } from "./utils/logger.js";
import type { IDEKey, MCPConfiguration, MCPServerKey } from "./types/index.js";
import { PlaywrightService } from "./services/mcp/playwright.js";

export class MCPSetupApp {
  private promptService: PromptService;
  private setupService: MCPSetupService;

  constructor() {
    this.promptService = new PromptService();
    this.setupService = new MCPSetupService();
  }

  async run(): Promise<void> {
    try {
      displayBanner();

      // Step 1: Select IDEs
      const selectedIDEs = await this.promptService.promptForIDEs();

      if (selectedIDEs.length === 0) {
        logInfo("No IDEs selected. Exiting...");
        return;
      }

      // Step 2: Select MCP servers
      const selectedMCPServers = await this.promptService.promptForMCPServers();

      if (selectedMCPServers.length === 0) {
        logInfo("No MCP servers selected. Exiting...");
        return;
      }

      await this.confirmAndSetup(selectedIDEs, selectedMCPServers);
    } catch (error) {
      logError(
        `Application error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      process.exit(1);
    }
  }

  private async confirmAndSetup(
    selectedIDEs: IDEKey[],
    mcpConfigurations: MCPServerKey[]
  ): Promise<void> {
    this.setupService.setupMultipleIDEs(selectedIDEs, mcpConfigurations);

    console.log("\n🎉 Setup completed! Your IDEs are now configured for MCP.");
  }
}
