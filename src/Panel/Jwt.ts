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
      i18n.t("view.devtoys.coders.jwt.panel.title"),
      Jwt
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    let result = /(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/.test(
      data
    );
    return result ? PanelType.jwt : false;
  }

  public dispose(): void {
    super.dispose();
    Jwt.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(Jwt);
