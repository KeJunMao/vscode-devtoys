import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class Timestamp extends ToolPanel<Timestamp> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.timestamp, "vue");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.timestamp,
      i18n.t("view.devtoys.convertors.timestamp.panel.title"),
      Timestamp
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    try {
      new Date(data);
      return PanelType.timestamp;
    } catch (error) {
      return false;
    }
  }

  public dispose(): void {
    super.dispose();
    Timestamp.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(Timestamp);
