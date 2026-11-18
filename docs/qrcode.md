# Module: Qrcode

**File:** `\src\Panel\Qrcode.ts`

## Overview

Module `Qrcode` contains 1 analyzed entities.

```
import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class Qrcode extends ToolPanel<Qrcode> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.qrcode, "vue");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.qrcode,
      i18n.t("view.devtoys.Graphic.qrcode.panel.title"),
      Qrcode
    );
  }

  public dispose(): void {
    super.dispose();
    Qrcode.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(Qrcode);
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `Qrcode.Qrcode` | class | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
