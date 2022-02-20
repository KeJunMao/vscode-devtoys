import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class Qrcode extends ToolPanel<Qrcode> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.qrcode, "vue");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.qrcode,
      i18n.t("view.devtoys.Graphic.qrcode.panel.title"),
      Qrcode
    );
  }

  public dispose(): void {
    super.dispose();
    Qrcode.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(Qrcode);
