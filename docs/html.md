# Module: Html

**File:** `\src\Panel\Html.ts`

## Overview

Module `Html` contains 1 analyzed entities.

```
import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class Html extends ToolPanel<Html> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.html, "svelte");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.html,
      i18n.t("view.devtoys.coders.html.panel.title"),
      Html
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    let result = /<(\w+)[^>]*>(.*?<\/\1>)?/.test(data);
    return result ? PanelType.html : false;
  }

  public dispose(): void {
    super.dispose();
    Html.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(Html);
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `Html.Html` | class | No description |

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 0
- Features: 2

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
