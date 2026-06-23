import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { compile } from "../lib/compiler.js";

const ROOT = process.cwd();
const EXAMPLES_DIR = path.join(ROOT, "examples");

async function listLiquidFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) continue;
    if (!entry.name.endsWith(".liquid")) continue;
    if (entry.name.endsWith(".compiled.liquid")) continue;
    files.push(fullPath);
  }

  return files;
}

function compiledPathFor(inputPath) {
  const parsed = path.parse(inputPath);
  return path.join(parsed.dir, `${parsed.name}.compiled${parsed.ext}`);
}

async function main() {
  const files = await listLiquidFiles(EXAMPLES_DIR);
  if (files.length === 0) {
    console.log("No example .liquid files found.");
    return;
  }

  let compiledCount = 0;
  for (const filePath of files) {
    const source = await fs.readFile(filePath, "utf8");
    const output = compile(source);
    const outPath = compiledPathFor(filePath);
    await fs.writeFile(outPath, output, "utf8");
    compiledCount += 1;
    console.log(`Compiled: ${path.relative(ROOT, filePath)} -> ${path.relative(ROOT, outPath)}`);
  }

  console.log(`Done ✔ Compiled ${compiledCount} example file(s).`);
}

main().catch((err) => {
  console.error("Failed to compile examples:", err);
  process.exitCode = 1;
});

