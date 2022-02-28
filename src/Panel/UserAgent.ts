import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class UserAgent extends ToolPanel<UserAgent> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.userAgent, "react");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.userAgent,
      i18n.t("view.devtoys.others.userAgent.panel.title"),
      UserAgent
    );
  }

  public dispose(): void {
    super.dispose();
    UserAgent.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(UserAgent);
