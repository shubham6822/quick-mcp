import inquirer from "inquirer";
import IDE_CONFIGS from "../config/ide-configs.js";
import type { IDEKey } from "../types/index.js";

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
