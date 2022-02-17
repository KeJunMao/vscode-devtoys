import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class Html extends ToolPanel<Html> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.html);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.html,
      i18n.t("view.devtoys.coders.html.panel.title"),
      Html
    );
  }

  public dispose(): void {
    super.dispose();
    Html.currentPanel = undefined;
  }
}
