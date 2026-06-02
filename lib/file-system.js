import { promises as fs } from "node:fs";
import path from "node:path";

export async function ensureFileExists(filePath) {
  await fs.access(filePath);
}

export async function readTextFile(filePath) {
  return fs.readFile(filePath, "utf8");
}

export async function writeTextFile(filePath, content) {
  await fs.writeFile(filePath, content, "utf8");
}

export function getCompiledOutputPath(inputPath) {
  const parsed = path.parse(inputPath);
  return path.join(parsed.dir, `${parsed.name}.compiled${parsed.ext}`);
}
