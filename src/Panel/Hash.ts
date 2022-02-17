import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class Hash extends ToolPanel<Hash> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.hash);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.hash,
      i18n.t("view.devtoys.Generators.hash.panel.title"),
      Hash
    );
  }

  public dispose(): void {
    super.dispose();
    Hash.currentPanel = undefined;
  }
}
