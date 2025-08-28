import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname } from "path";
import type { FileSystemOperations } from "../types/index.js";

export class FileSystemService implements FileSystemOperations {
  ensureDirectory(path: string): void {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }

  ensureDirectoryForFile(filePath: string): void {
    const dir = dirname(filePath);
    if (dir && dir !== ".") {
      this.ensureDirectory(dir);
    }
  }

  readJSON<T>(path: string): T | null {
    if (!this.fileExists(path)) {
      return null;
    }

    try {
      const content = readFileSync(path, "utf-8");
      return JSON.parse(content) as T;
    } catch (error) {
      console.error(`⚠️ Error reading JSON file ${path}:`, error);
      return null;
    }
  }

  writeJSON(path: string, data: unknown): void {
    try {
      this.ensureDirectoryForFile(path);
      const content = JSON.stringify(data, null, 2);
      writeFileSync(path, content, "utf-8");
    } catch (error) {
      console.error(`⚠️ Error writing JSON file ${path}:`, error);
      throw error;
    }
  }

  fileExists(path: string): boolean {
    return existsSync(path);
  }
}

export const fileSystem = new FileSystemService();
