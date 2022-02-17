import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class Url extends ToolPanel<Url> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.url);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.url,
      i18n.t("view.devtoys.Coders.url.panel.title"),
      Url
    );
  }

  public dispose(): void {
    super.dispose();
    Url.currentPanel = undefined;
  }
}
