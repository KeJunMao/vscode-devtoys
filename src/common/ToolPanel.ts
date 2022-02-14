import * as vscode from "vscode";
import { getNonce } from "../utils";
import { PanelType } from "./IToolData";

export class ToolPanel<T> {
  static currentPanel: ToolPanel<unknown> | undefined;

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];
  private _type: PanelType;

  public static createOrShow<T>(
    extensionUri: vscode.Uri,
    type: PanelType,
    title: string,
    toolClass: { new (panel: vscode.WebviewPanel, extensionUri: vscode.Uri): T }
  ) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (this.currentPanel) {
      this.currentPanel._panel.reveal(column);
      this.currentPanel._update();
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
        ],
      }
    );

    this.currentPanel = new ToolPanel(panel, extensionUri, type);
  }
  constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    type: PanelType
  ) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._type = type;
    this._update();
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public static kill() {
    this.currentPanel?.dispose();
    this.currentPanel = undefined;
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

    return `<!DOCTYPE html>
  			<html lang="zh">
  			<head>
  				<meta charset="UTF-8">
  				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'self' 'unsafe-inline'; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
  				<meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="${cssUri}" rel="stylesheet">
          <script nonce="${nonce}">
              const tsvscode = acquireVsCodeApi();
          </script>
  			</head>
        <body>
  			</body>
  				<script nonce="${nonce}" src="${scriptUri}"></script>
  			</html>`;
  }
}
