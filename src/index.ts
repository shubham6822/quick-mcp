#!/usr/bin/env node

import { MCPSetupApp } from "./app.js";

async function main(): Promise<void> {
  const app = new MCPSetupApp();
  await app.run();
}

// Run the application
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
