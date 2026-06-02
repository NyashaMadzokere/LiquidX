import path from "node:path";
import process from "node:process";
import { readTextFile } from "../lib/file-system.js";
import { compile } from "../lib/compiler.js";

async function run() {
  const samplePath = path.resolve(process.cwd(), "examples", "sample.liquid");

  try {
    const source = await readTextFile(samplePath);
    const output = compile(source);

    console.log("=== LiquidX Manual Test Runner ===\n");
    console.log(`Input file: ${samplePath}\n`);
    console.log("--- Source ---");
    console.log(source);
    console.log("\n--- Compiled ---");
    console.log(output);
  } catch (error) {
    console.error("Failed to run manual test:", error?.message ?? error);
    process.exitCode = 1;
  }
}

run();
