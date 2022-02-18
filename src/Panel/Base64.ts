import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class Base64 extends ToolPanel<Base64> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.base64, "svelte");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.base64,
      i18n.t("view.devtoys.coders.base64.panel.title"),
      Base64
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    const result =
      /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(
        data
      );
    return result ? PanelType.base64 : false;
  }

  public dispose(): void {
    super.dispose();
    Base64.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(Base64);
