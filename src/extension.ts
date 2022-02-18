import * as vscode from "vscode";
import i18n from "./i18n";
import { devToysTreeDataProvider } from "./explorer/DevToysTreeDataProvider";
import { explorerNodeManager } from "./explorer/explorerNodeManager";
import showTool from "./commands/showTool";
import searchTool from "./commands/searchTool";
import automatically from "./commands/automatically";

export function activate(context: vscode.ExtensionContext) {
  i18n.init(context.extensionPath);
  explorerNodeManager.initialize();
  devToysTreeDataProvider.initialize(context);

  context.subscriptions.push(
    vscode.commands.registerCommand("devtoys.searchTool", searchTool),
    vscode.commands.registerCommand("devtoys.showTool", showTool(context)),
    vscode.commands.registerCommand(
      "devtoys.automatically",
      automatically(context)
    ),
    vscode.window.createTreeView("github-kejun-devtoys", {
      treeDataProvider: devToysTreeDataProvider,
      showCollapseAll: true,
    })
  );
}

export function deactivate() {}
