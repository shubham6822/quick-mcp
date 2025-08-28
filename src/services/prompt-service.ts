import inquirer from "inquirer";
import IDE_CONFIGS from "../config/ide-configs.js";
import MCP_SERVERS from "../config/mcp-servers.js";
import type { IDEKey, MCPServerKey, MCPConfiguration } from "../types/index.js";

export class PromptService {
  async promptForIDEs(): Promise<IDEKey[]> {
    try {
      const answers = await inquirer.prompt({
        type: "checkbox",
        name: "selectedIDEs",
        message: "Select the IDEs you want to configure:",
        choices: Object.entries(IDE_CONFIGS).map(([key, config]) => ({
          name: config.name,
          value: key as IDEKey,
          checked: false,
        })),
        validate: (answer: unknown) => {
          const selected = answer as IDEKey[];
          if (!Array.isArray(selected) || selected.length < 1) {
            return "You must select at least one IDE.";
          }
          return true;
        },
      });

      return (answers as { selectedIDEs: IDEKey[] }).selectedIDEs;
    } catch (error) {
      console.error("Error prompting for IDEs:", error);
      throw error;
    }
  }

  async promptForMCPServers(): Promise<MCPConfiguration[]> {
    try {
      // First, let user select MCP servers
      const serverAnswers = await inquirer.prompt({
        type: "checkbox",
        name: "selectedServers",
        message: "Select the MCP servers you want to configure:",
        choices: Object.entries(MCP_SERVERS).map(([key, server]) => ({
          name: `${server.name} (${key})`,
          value: key as MCPServerKey,
          checked: false,
        })),
        validate: (answer: unknown) => {
          const selected = answer as MCPServerKey[];
          if (!Array.isArray(selected) || selected.length < 1) {
            return "You must select at least one MCP server.";
          }
          return true;
        },
      });

      const selectedServers = (
        serverAnswers as { selectedServers: MCPServerKey[] }
      ).selectedServers;
      const configurations: MCPConfiguration[] = [];

      // For each selected server, check if it needs environment variables or custom arguments
      for (const serverKey of selectedServers) {
        const server = MCP_SERVERS[serverKey];

        if (!server) {
          console.error(`Server configuration not found for: ${serverKey}`);
          continue;
        }

        let envValues: Record<string, string> | undefined;
        let customArgs = [...server.args]; // Copy the original args

        // Handle servers that need custom path arguments
        if (serverKey === "filesystem") {
          const pathAnswer = await inquirer.prompt({
            type: "input",
            name: "path",
            message:
              "Enter the path to the directory you want to allow access to:",
            default: process.cwd(),
            validate: (input: string) => {
              if (!input.trim()) {
                return "Path is required for filesystem server";
              }
              return true;
            },
          });
          // Replace the placeholder path
          customArgs = [
            "-y",
            "@modelcontextprotocol/server-filesystem",
            (pathAnswer as { path: string }).path,
          ];
        } else if (serverKey === "sqlite") {
          const dbPathAnswer = await inquirer.prompt({
            type: "input",
            name: "dbPath",
            message: "Enter the path to your SQLite database file:",
            default: "./database.db",
            validate: (input: string) => {
              if (!input.trim()) {
                return "Database path is required for SQLite server";
              }
              return true;
            },
          });
          // Replace the placeholder path
          customArgs = [
            "-y",
            "@modelcontextprotocol/server-sqlite",
            (dbPathAnswer as { dbPath: string }).dbPath,
          ];
        }

        // Handle environment variables
        if (server.env && Object.keys(server.env).length > 0) {
          console.log(`\n🔧 ${server.name} requires environment variables:`);
          envValues = {};

          for (const [envKey, defaultValue] of Object.entries(server.env)) {
            const envAnswer = await inquirer.prompt({
              type: "input",
              name: "envValue",
              message: `Enter value for ${envKey}:`,
              default:
                defaultValue === "YOUR-API-KEY" ||
                defaultValue.includes("YOUR-")
                  ? ""
                  : defaultValue,
              validate: (input: string) => {
                if (!input.trim()) {
                  return `${envKey} is required for ${server.name}`;
                }
                return true;
              },
            });

            envValues[envKey] = (envAnswer as { envValue: string }).envValue;
          }
        }

        const configurationData: MCPConfiguration = {
          serverKey,
          server: {
            ...server,
            args: customArgs, // Use the custom args instead of original
          },
        };

        if (envValues) {
          configurationData.envValues = envValues;
        }

        configurations.push(configurationData);
      }

      return configurations;
    } catch (error) {
      console.error("Error prompting for MCP servers:", error);
      throw error;
    }
  }

  async confirmAction(message: string): Promise<boolean> {
    try {
      const answers = await inquirer.prompt({
        type: "confirm",
        name: "confirmed",
        message,
        default: true,
      });

      return (answers as { confirmed: boolean }).confirmed;
    } catch (error) {
      console.error("Error prompting for confirmation:", error);
      throw error;
    }
  }
}
