# Module: ToolPanel

**File:** `\src\common\ToolPanel.ts`

## Overview

Module `ToolPanel` contains 1 analyzed entities.

```
import * as vscode from "vscode";
import { getNonce } from "../utils";
import { PanelType } from "../shared";

export class ToolPanel<V> {
  static currentPanel: ToolPanel<unknown> | undefined;
  static allPanel: Set<any> = new Set();

  private readonly _panel: vscode.WebviewPanel;

  public get panel(): vscode.WebviewPanel {
    return this._panel;
  }

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

    while (this._disposables.le
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `ToolPanel.ToolPanel` | class | No description |

## Git History

- Commits: 13
- Authors: 2
- Bug fixes: 3
- Features: 9

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
