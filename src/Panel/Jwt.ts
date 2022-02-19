import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class Jwt extends ToolPanel<Jwt> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.jwt, "vue");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.base64,
      "JWT Encoder/Decoder",
      Jwt
    );
  }

  public dispose(): void {
    super.dispose();
    Jwt.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(Jwt);
