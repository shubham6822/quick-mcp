import IDE_CONFIGS from "../config/ide-configs.js";
import type { IDEKey, MCPEntry } from "../types/index.js";
import { fileSystem } from "../utils/file-system.js";
import { createMCPEntry, normalizeJSONData } from "../utils/validators.js";
import { logSuccess, logError, logWarning } from "../utils/logger.js";

export class MCPSetupService {
  setupIDE(ideKey: IDEKey): void {
    try {
      const config = IDE_CONFIGS[ideKey];
      if (!config) {
        throw new Error(`Unknown IDE: ${ideKey}`);
      }

      this.ensureDirectoryExists(config.dirPath);
      this.writeConfigurationFile(config.filePath, config.name);

      logSuccess(`Configured ${config.name}`);
    } catch (error) {
      logError(
        `Failed to configure ${ideKey}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      throw error;
    }
  }

  setupMultipleIDEs(ideKeys: IDEKey[]): void {
    const results = { success: 0, failed: 0 };

    for (const ideKey of ideKeys) {
      try {
        this.setupIDE(ideKey);
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

  private writeConfigurationFile(filePath: string, ideName: string): void {
    const newEntry = createMCPEntry(
      `Hello from setup-mcp CLI 🎉 - ${ideName} configured`
    );

    // Read existing data
    const existingData = fileSystem.readJSON<unknown>(filePath);
    const data = normalizeJSONData(existingData);

    // Add new entry
    data.push(newEntry);

    // Write back to file
    fileSystem.writeJSON(filePath, data);
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

  getConfigurationSummary(ideKeys: IDEKey[]): string {
    const configurations = ideKeys
      .map((ideKey) => {
        const config = IDE_CONFIGS[ideKey];
        return `  • ${config?.name}: ${config?.filePath}`;
      })
      .join("\n");

    return `Configuration Summary:\n${configurations}`;
  }
}
