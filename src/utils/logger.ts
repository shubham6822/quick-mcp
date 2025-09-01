import figlet from "figlet";
import chalk from "chalk";
import { APP_CONFIG } from "../config/constants.js";

export function displayBanner(): void {
  console.log(
    chalk.cyan(
      figlet.textSync(APP_CONFIG.name, {
        font: APP_CONFIG.bannerFont,
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );

  console.log(chalk.magenta("🚀 Quick MCP Setup"));
  console.log(chalk.blue(`${APP_CONFIG.description}\n`));
}

export function logSuccess(message: string): void {
  console.log(chalk.green(`✅ ${message}`));
}

export function logError(message: string): void {
  console.log(chalk.red(`❌ ${message}`));
}

export function logWarning(message: string): void {
  console.log(chalk.yellow(`⚠️ ${message}`));
}

export function logInfo(message: string): void {
  console.log(chalk.blue(`${message}`));
}
