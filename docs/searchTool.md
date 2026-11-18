# Module: searchTool

**File:** `\src\commands\searchTool.ts`

## Overview

Module `searchTool` contains 0 analyzed entities.

```
import { explorerNodeManager } from "../explorer/explorerNodeManager";
import * as vscode from "vscode";
import i18n from "../i18n";

export default (nodes = explorerNodeManager.getAllNodes()) => {
  const choice = vscode.window.showQuickPick(
    nodes.map((node) => ({
      label: node.label,
      description: node.tooltip,
      detail: node.panel as string,
      value: node,
    })),
    {
      matchOnDescription: true,
      matchOnDetail: true,
      placeHolder: i18n.t("command.devtoys.searchTool.placeHolder"),
    }
  );
  if (!choice) {
    return choice;
  }
  return choice.then((value) => {
    vscode.commands.executeCommand("devtoys.showTool", value?.value);
  });
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
