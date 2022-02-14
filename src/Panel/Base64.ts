import { PanelType } from "../common/IToolData";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";

export class Base64 extends ToolPanel<Base64> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.base64);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(extensionUri, PanelType.base64, "Base64", Base64);
  }

  public dispose(): void {
    super.dispose();
    Base64.currentPanel = undefined;
  }
}
