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

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const files = await listLiquidFiles(EXAMPLES_DIR);
  if (files.length === 0) {
    console.log("No example .liquid files found.");
    return;
  }

  const outOfDate = [];

  for (const filePath of files) {
    const source = await fs.readFile(filePath, "utf8");
    const expected = compile(source);
    const outPath = compiledPathFor(filePath);

    if (!(await fileExists(outPath))) {
      outOfDate.push({ filePath, reason: "missing compiled output" });
      continue;
    }

    const actual = await fs.readFile(outPath, "utf8");
    if (actual.replace(/\r\n/g, "\n") !== expected.replace(/\r\n/g, "\n")) {
      outOfDate.push({ filePath, reason: "compiled output differs" });
    }
  }

  if (outOfDate.length === 0) {
    console.log("Done ✔ All example compiled files are up to date.");
    return;
  }

  console.error("Some compiled example outputs are out of date:");
  for (const item of outOfDate) {
    console.error(`- ${path.relative(ROOT, item.filePath)} (${item.reason})`);
  }
  console.error("\nFix by running:\n  npm run liquidx:compile:examples\n");
  process.exitCode = 1;
}

main().catch((err) => {
  console.error("Failed to check examples:", err);
  process.exitCode = 1;
});

