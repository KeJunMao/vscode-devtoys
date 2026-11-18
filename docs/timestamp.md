# Module: Timestamp

**File:** `\src\Panel\Timestamp.ts`

## Overview

Module `Timestamp` contains 1 analyzed entities.

```
import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";
import { isValidDate } from "../utils";

export class Timestamp extends ToolPanel<Timestamp> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.timestamp, "vue");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.timestamp,
      i18n.t("view.devtoys.convertors.timestamp.panel.title"),
      Timestamp
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    try {
      const d = new Date(data);
      const e = new Date(Number(data));
      if (isValidDate(d) || isValidDate(e)) {
        return PanelType.timestamp;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  public dispose(): void {
    super.dispose();
    Timestamp.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(Timestamp);
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `Timestamp.Timestamp` | class | No description |

## Git History

- Commits: 3
- Authors: 2
- Bug fixes: 1
- Features: 2

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
