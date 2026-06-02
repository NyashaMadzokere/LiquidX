const vscode = require("vscode");
const { compileActiveFile, handleSave, initOutputChannel } = require("./compile");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  initOutputChannel();

  context.subscriptions.push(
    vscode.commands.registerCommand("liquidx.compile", () => {
      return compileActiveFile({ openOutput: false });
    }),
    vscode.commands.registerCommand("liquidx.compileAndShow", () => {
      return compileActiveFile({ openOutput: true });
    }),
    vscode.workspace.onDidSaveTextDocument((document) => {
      return handleSave(document);
    })
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
