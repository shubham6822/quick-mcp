import inquirer from "inquirer";
import IDE_CONFIGS from "./IDE_CONFIGS.js";

export async function promptForIDEs() {
  const { selectedIDEs } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedIDEs",
      message: "Select the IDEs you want to configure:",
      choices: Object.entries(IDE_CONFIGS).map(([key, config]) => ({
        name: config.name,
        value: key,
        checked: false,
      })),
      validate: (answer) => {
        if (answer.length < 1) {
          return "You must select at least one IDE.";
        }
        return true;
      },
    },
  ]);

  return selectedIDEs;
}
