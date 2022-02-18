import { explorerNodeManager } from "../explorer/explorerNodeManager";
import * as vscode from "vscode";
import i18n from "../i18n";

export default (nodes = explorerNodeManager.getAllNodes()) => {
  const choice = vscode.window.showQuickPick(
    nodes.map((node) => ({
      label: node.label,
      description: node.tooltip,
      detail: node.panel as string,
      value: node,
    })),
    {
      matchOnDescription: true,
      matchOnDetail: true,
      placeHolder: i18n.t("command.devtoys.searchTool.placeHolder"),
    }
  );
  if (!choice) {
    return choice;
  }
  return choice.then((value) => {
    vscode.commands.executeCommand("devtoys.showTool", value?.value);
  });
};
