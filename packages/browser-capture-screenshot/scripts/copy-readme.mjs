import { copyFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

// go 3 level up
const packageDirectory = dirname(import.meta.dirname);
const rootDir = dirname(dirname(packageDirectory));

const sourceReadmeFilePath = resolve(rootDir, 'README.md');
const targetReadmeFilePath = resolve(packageDirectory, 'README.md');

await copyFile(sourceReadmeFilePath, targetReadmeFilePath);
