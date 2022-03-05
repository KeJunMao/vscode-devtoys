import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";
//@ts-ignore
import * as curlconverter from "curlconverter";

export class CurlToCode extends ToolPanel<CurlToCode> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.curlToCode, "react");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.curlToCode,
      i18n.t("view.devtoys.convertors.curlToCode.panel.title"),
      CurlToCode
    );
  }

  protected async _update() {
    super._update();
    const webview = this.panel.webview;
    webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "onConvert": {
          const { language, command } = data.value;
          let result;
          try {
            // @ts-ignore
            result = curlconverter[language](command);
          } catch (error) {
            result = String(error);
          }
          webview.postMessage(result);
          break;
        }
      }
    });
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    if (data.startsWith("curl ")) {
      return PanelType.curlToCode;
    }
    return false;
  }

  public dispose(): void {
    super.dispose();
    CurlToCode.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(CurlToCode);
