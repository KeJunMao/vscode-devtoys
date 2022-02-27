import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class Cron extends ToolPanel<Cron> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.cron, "react");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.cron,
      i18n.t("view.devtoys.others.cron.panel.title"),
      Cron
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    const regex =
      /^(\*|((\*\/)?[1-5]?[0-9])) (\*|((\*\/)?[1-5]?[0-9])) (\*|((\*\/)?(1?[0-9]|2[0-3]))) (\*|((\*\/)?([1-9]|[12][0-9]|3[0-1]))) (\*|((\*\/)?([1-9]|1[0-2]))) (\*|((\*\/)?[0-6]))$/;
    if (regex.test(data)) {
      return PanelType.cron;
    }
    return false;
  }

  public dispose(): void {
    super.dispose();
    Cron.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(Cron);
