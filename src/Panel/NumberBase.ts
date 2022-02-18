import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class NumberBase extends ToolPanel<NumberBase> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.numberBase, "svelte");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.numberBase,
      i18n.t("view.devtoys.convertors.numberBase.panel.title"),
      NumberBase
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    let result = /^[0-9a-fA-F]+$/.test(data);
    return result ? PanelType.numberBase : false;
  }

  public dispose(): void {
    super.dispose();
    NumberBase.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(NumberBase);
