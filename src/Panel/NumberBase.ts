import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class NumberBase extends ToolPanel<NumberBase> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.numberBase);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.numberBase,
      i18n.t("view.devtoys.convertors.numberBase.panel.title"),
      NumberBase
    );
  }

  public dispose(): void {
    super.dispose();
    NumberBase.currentPanel = undefined;
  }
}
