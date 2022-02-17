import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class UUID extends ToolPanel<UUID> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.uuid);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.uuid,
      i18n.t("view.devtoys.generators.uuid.panel.title"),
      UUID
    );
  }

  public dispose(): void {
    super.dispose();
    UUID.currentPanel = undefined;
  }
}
