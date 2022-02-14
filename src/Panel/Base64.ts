import { PanelType } from "../common/IToolData";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";

export class Base64 extends ToolPanel {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.base64);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    ToolPanel.createOrShow(extensionUri, PanelType.base64, "Base64");
  }
}
