import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class Url extends ToolPanel<Url> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.url);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.url,
      i18n.t("view.devtoys.Coders.url.panel.title"),
      Url
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    const result =
      /^(((ht|f)tps?):\/\/)([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
        data
      );
    return result ? PanelType.url : false;
  }

  public dispose(): void {
    super.dispose();
    Url.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(Url);
