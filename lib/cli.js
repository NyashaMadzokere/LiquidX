import path from "node:path";
import process from "node:process";
import { compile } from "./compiler.js";
import {
  ensureFileExists,
  getCompiledOutputPath,
  readTextFile,
  writeTextFile
} from "./file-system.js";
import { CliError } from "./errors.js";

function printHelp() {
  console.log(
    [
      "Usage:",
      "  liquidx <path-to-template.liquid>",
      "",
      "Description:",
      "  Compiles a .liquid file and writes a .compiled.liquid file in the same directory."
    ].join("\n")
  );
}

function validateInputPath(inputPath) {
  if (!inputPath) {
    printHelp();
    throw new CliError("Missing input path.", 1);
  }

  if (inputPath === "--help" || inputPath === "-h") {
    printHelp();
    return null;
  }

  if (path.extname(inputPath).toLowerCase() !== ".liquid") {
    throw new CliError("Input file must use the .liquid extension.");
  }

  return path.resolve(process.cwd(), inputPath);
}

export async function compileFile(inputPath) {
  // Core compile use case: read source, compile with core pipeline, write artifact.
  await ensureFileExists(inputPath);
  const source = await readTextFile(inputPath);
  const output = compile(source);
  const outputPath = getCompiledOutputPath(inputPath);
  await writeTextFile(outputPath, output);
  return { inputPath, outputPath, output };
}

export async function runCli(args) {
  try {
    const inputCandidate = validateInputPath(args[0]);
    if (!inputCandidate) return;

    console.log(`Compiling ${path.basename(inputCandidate)}...`);
    const { outputPath } = await compileFile(inputCandidate);
    console.log(`Done ✔ ${path.basename(outputPath)}`);
    console.log(`Compiled: ${path.basename(inputCandidate)} -> ${path.basename(outputPath)}`);
  } catch (error) {
    if (error instanceof CliError) {
      console.error(`Error: ${error.message}`);
      process.exitCode = error.exitCode;
      return;
    }

    if (error && error.code === "ENOENT") {
      console.error("Error: Input file not found.");
      process.exitCode = 1;
      return;
    }

    console.error("Unexpected error:", error);
    process.exitCode = 1;
  }
}
