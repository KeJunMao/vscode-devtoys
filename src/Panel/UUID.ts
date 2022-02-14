import { PanelType } from "../common/IToolData";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";

export class UUID extends ToolPanel<UUID> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.uuid);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(extensionUri, PanelType.uuid, "UUID", UUID);
  }

  public dispose(): void {
    super.dispose();
    UUID.currentPanel = undefined;
  }
}
