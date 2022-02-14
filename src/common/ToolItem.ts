import path = require("path");
import * as vscode from "vscode";

export class ToolItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly description: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }

  // iconPath = {
  //   light: path.join(
  //     __filename,
  //     "..",
  //     "..",
  //     "resources",
  //     "light",
  //     "dependency.svg"
  //   ),
  //   dark: path.join(
  //     __filename,
  //     "..",
  //     "..",
  //     "resources",
  //     "dark",
  //     "dependency.svg"
  //   ),
  // };

  contextValue = "ToolItem";
}
