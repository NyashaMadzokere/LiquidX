const { copyFile, mkdir } = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const targetDir = path.resolve(__dirname, "..", "compiler");
const files = ["compiler.js", "transforms.js"];

(async () => {
  await mkdir(targetDir, { recursive: true });

  for (const file of files) {
    await copyFile(path.join(root, "lib", file), path.join(targetDir, file));
  }

  console.log("Synced compiler modules into vscode-extension/compiler/");
})();
