import * as vscode from "vscode";
import { IToolData } from "./IToolData";
import { ToolItem } from "./ToolItem";
import i18n from "../i18n";

export class ToolGrpupProvider implements vscode.TreeDataProvider<ToolItem> {
  constructor(public readonly tools: IToolData[]) {}

  getTreeItem(element: ToolItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: ToolItem): Thenable<ToolItem[]> {
    if (this.tools && this.tools.length > 0) {
      return Promise.resolve(
        this.tools.map(
          (v) =>
            new ToolItem(
              v.label,
              v.tooltip,
              vscode.TreeItemCollapsibleState.None,
              {
                command: "devtoys.showTool",
                title: "",
                arguments: [v.panel],
              }
            )
        )
      );
    } else {
      return Promise.resolve([
        new ToolItem(
          i18n.t("view.devtoys.noTools"),
          "",
          vscode.TreeItemCollapsibleState.None
        ),
      ]);
    }
  }
}
