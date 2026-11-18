# Module: UUID

**File:** `\src\Panel\UUID.ts`

## Overview

Module `UUID` contains 1 analyzed entities.

```
import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class UUID extends ToolPanel<UUID> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.uuid, "svelte");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.uuid,
      i18n.t("view.devtoys.generators.uuid.panel.title"),
      UUID
    );
  }

  public dispose(): void {
    super.dispose();
    UUID.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(UUID);
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `UUID.UUID` | class | No description |

## Git History

- Commits: 5
- Authors: 1
- Bug fixes: 1
- Features: 2

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
