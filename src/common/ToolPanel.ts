import * as vscode from "vscode";
import { getNonce } from "../utils";
import { PanelType } from "./IToolData";

export class ToolPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: ToolPanel | undefined;

  public static readonly viewType = "toolPanel";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];
  private _type: PanelType;

  public static createOrShow(
    extensionUri: vscode.Uri,
    type: PanelType,
    title: string
  ) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (ToolPanel.currentPanel) {
      ToolPanel.currentPanel._panel.reveal(column);
      ToolPanel.currentPanel._update();
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      ToolPanel.viewType,
      title,
      column || vscode.ViewColumn.One,
      {
        // Enable javascript in the webview
        enableScripts: true,

        // And restrict the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, "media"),
          vscode.Uri.joinPath(extensionUri, "out/compiled"),
        ],
      }
    );

    ToolPanel.currentPanel = new ToolPanel(panel, extensionUri, type);
  }

  public static kill() {
    ToolPanel.currentPanel?.dispose();
    ToolPanel.currentPanel = undefined;
  }

  public static revive(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    type: PanelType
  ) {
    ToolPanel.currentPanel = new ToolPanel(panel, extensionUri, type);
  }

  public constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    type: PanelType
  ) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._type = type;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public dispose() {
    ToolPanel.currentPanel = undefined;

    // Clean up our resources
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

    // Use a nonce to only allow specific scripts to be run
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
