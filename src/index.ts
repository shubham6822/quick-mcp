#!/usr/bin/env node

import figlet from "figlet";
import chalk from "chalk";
import { promptForIDEs } from "./ide/index.js";
import { existsSync, mkdirSync } from "fs";
import IDE_CONFIGS from "./ide/IDE_CONFIGS.js";

// Show ASCII banner
console.log(
  chalk.cyan(
    figlet.textSync("MCP Helper", {
      font: "ANSI Shadow", // Try "Slant", "Big", etc.
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  )
);

// Subtitle with colors
console.log(chalk.magenta("🚀 Quick MCP Setup"));
console.log(
  chalk.blue("Set up Model Context Protocol servers for your IDEs\n")
);

async function main() {
  const selectedIDEs: Array<keyof typeof IDE_CONFIGS> = await promptForIDEs();

  selectedIDEs.forEach((ide) => {
    const dirPath = IDE_CONFIGS[ide].dirPath;
    const filePath = IDE_CONFIGS[ide].filePath;

    if (!existsSync(dirPath)) {
      mkdirSync(dirPath);
    }
  });
}

main();
