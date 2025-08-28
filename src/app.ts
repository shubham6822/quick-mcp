import { PromptService } from "./services/prompt-service.js";
import { MCPSetupService } from "./services/mcp-setup-service.js";
import { displayBanner, logInfo, logError } from "./utils/logger.js";
import type { IDEKey } from "./types/index.js";

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

      const selectedIDEs = await this.promptService.promptForIDEs();

      if (selectedIDEs.length === 0) {
        logInfo("No IDEs selected. Exiting...");
        return;
      }

      await this.confirmAndSetup(selectedIDEs);
    } catch (error) {
      logError(
        `Application error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      process.exit(1);
    }
  }

  private async confirmAndSetup(selectedIDEs: IDEKey[]): Promise<void> {
    const summary = this.setupService.getConfigurationSummary(selectedIDEs);
    console.log("\n" + summary + "\n");

    // Confirm before proceeding
    const shouldProceed = await this.promptService.confirmAction(
      "Do you want to proceed with the configuration?"
    );

    if (!shouldProceed) {
      logInfo("Configuration cancelled by user.");
      return;
    }

    this.setupService.setupMultipleIDEs(selectedIDEs);

    console.log("\n🎉 Setup completed! Your IDEs are now configured for MCP.");
  }
}
