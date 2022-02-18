import * as vscode from "vscode";
import { getNonce } from "../utils";
import { PanelType } from "../shared";

export class ToolPanel<V> {
  static currentPanel: ToolPanel<unknown> | undefined;
  static allPanel: Set<any> = new Set();

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];
  private _type: PanelType;
  private _webFramework: string;

  public static createOrShow<T extends ToolPanel<unknown>>(
    extensionUri: vscode.Uri,
    type: PanelType,
    title: string,
    toolClass: { new (panel: vscode.WebviewPanel, extensionUri: vscode.Uri): T }
  ) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;
    /// @ts-ignore
    if (toolClass.currentPanel) {
      /// @ts-ignore
      toolClass.currentPanel._panel.reveal(column);
      /// @ts-ignore
      toolClass.currentPanel._update();
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      type.toString() + "Panel",
      title,
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, "media"),
          vscode.Uri.joinPath(extensionUri, "out/compiled"),
          vscode.Uri.joinPath(extensionUri, "out/vender"),
        ],
      }
    );

    /// @ts-ignore
    toolClass.currentPanel = new toolClass(panel, extensionUri);
  }
  constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    type: PanelType,
    webFramework: string = "react"
  ) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._type = type;
    this._webFramework = webFramework;
    this._update();
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public dispose() {
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    return false;
  }

  private async _update() {
    const webview = this._panel.webview;

    this._panel.webview.html = this._getHtmlForWebview(webview);
    webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const venderUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "out",
        `vender/${this._webFramework}.js`
      )
    );
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "out",
        `compiled/${this._type}.js`
      )
    );
    const cssUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "out",
        `compiled/${this._type}.css`
      )
    );
    const nonce = getNonce();
    const language = vscode.env.language;

    return `<!DOCTYPE html>
  			<html lang="${language}">
  			<head>
  				<meta charset="UTF-8">
  				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'self' 'unsafe-inline'; img-src ${webview.cspSource} https: blob:; script-src 'nonce-${nonce}';">
  				<meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="${cssUri}" rel="stylesheet">
          <script nonce="${nonce}">
              window.tsvscode = acquireVsCodeApi();
              window.displayLanguage = "${language}";
          </script>
  			</head>
        <body>
          <div id='root'></div>
  			</body>
  				<script nonce="${nonce}" src="${venderUri}"></script>
  				<script nonce="${nonce}" src="${scriptUri}"></script>
  			</html>`;
  }
}
