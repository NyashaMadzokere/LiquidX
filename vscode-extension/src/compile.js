const vscode = require("vscode");
const path = require("path");
const fs = require("fs/promises");
const { pathToFileURL } = require("url");
const { execFile } = require("child_process");
const { promisify } = require("util");

const execFileAsync = promisify(execFile);

/** @type {vscode.OutputChannel | undefined} */
let outputChannel;

function getConfig() {
  return vscode.workspace.getConfiguration("liquidx");
}

function log(message) {
  if (!getConfig().get("showOutputChannel", true)) {
    return;
  }
  if (!outputChannel) {
    outputChannel = vscode.window.createOutputChannel("LiquidX");
  }
  outputChannel.appendLine(message);
}

function getCompiledOutputPath(inputPath) {
  const parsed = path.parse(inputPath);
  return path.join(parsed.dir, `${parsed.name}.compiled${parsed.ext}`);
}

function isLiquidDocument(document) {
  if (!document) {
    return false;
  }
  const languageId = document.languageId;
  return languageId === "liquid" || languageId === "liquidx";
}

function isCompiledArtifact(filePath) {
  return filePath.includes(".compiled.liquid");
}

async function resolveCompilerModule() {
  const extensionRoot = path.join(__dirname, "..");
  const bundledCompiler = path.join(extensionRoot, "compiler", "compiler.js");

  const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  const workspaceCompiler = workspaceRoot
    ? path.join(workspaceRoot, "lib", "compiler.js")
    : null;

  const candidates = [workspaceCompiler, bundledCompiler].filter(Boolean);

  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return import(pathToFileURL(candidate).href);
    } catch {
      // try next candidate
    }
  }

  throw new Error("LiquidX compiler module could not be loaded.");
}

async function compileWithCli(inputPath, cliPath) {
  await execFileAsync(cliPath, [inputPath], { cwd: path.dirname(inputPath) });
}

async function compileInProcess(source) {
  const { compile } = await resolveCompilerModule();
  return compile(source);
}

/**
 * @param {vscode.TextDocument} document
 * @param {{ openOutput?: boolean }} options
 */
async function compileDocument(document, options = {}) {
  const inputPath = document.uri.fsPath;

  if (!inputPath.endsWith(".liquid")) {
    vscode.window.showWarningMessage("LiquidX only compiles .liquid files.");
    return;
  }

  if (isCompiledArtifact(inputPath)) {
    vscode.window.showWarningMessage("Skipping compiled artifact files.");
    return;
  }

  const outputPath = getCompiledOutputPath(inputPath);
  const fileName = path.basename(inputPath);

  try {
    log(`Compiling ${fileName}...`);
    const cliPath = getConfig().get("cliPath", "").trim();

    if (cliPath) {
      await compileWithCli(inputPath, cliPath);
    } else {
      const source = document.getText();
      const compiled = await compileInProcess(source);
      await fs.writeFile(outputPath, compiled, "utf8");
    }

    log(`Done ✔ ${path.basename(outputPath)}`);
    log(`Compiled: ${fileName} -> ${path.basename(outputPath)}`);

    if (options.openOutput !== false && getConfig().get("openCompiledFile", true)) {
      const compiledDoc = await vscode.workspace.openTextDocument(vscode.Uri.file(outputPath));
      await vscode.window.showTextDocument(compiledDoc, { preview: false });
    }

    vscode.window.showInformationMessage(`LiquidX: compiled ${fileName}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log(`Error: ${message}`);
    vscode.window.showErrorMessage(`LiquidX compile failed: ${message}`);
  }
}

async function compileActiveFile(options = {}) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage("No active editor to compile.");
    return;
  }

  if (!isLiquidDocument(editor.document)) {
    vscode.window.showWarningMessage("Active file is not a Liquid template.");
    return;
  }

  await compileDocument(editor.document, options);
}

async function handleSave(document) {
  if (!getConfig().get("compileOnSave", false)) {
    return;
  }

  if (!isLiquidDocument(document)) {
    return;
  }

  if (isCompiledArtifact(document.uri.fsPath)) {
    return;
  }

  await compileDocument(document, { openOutput: false });
}

function initOutputChannel() {
  if (getConfig().get("showOutputChannel", true) && !outputChannel) {
    outputChannel = vscode.window.createOutputChannel("LiquidX");
  }
}

module.exports = {
  compileActiveFile,
  compileDocument,
  handleSave,
  initOutputChannel
};
