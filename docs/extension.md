# Module: extension

**File:** `\src\extension.ts`

## Overview

Module `extension` contains 2 analyzed entities.

```
import * as vscode from "vscode";
import i18n from "./i18n";
import { devToysTreeDataProvider } from "./explorer/DevToysTreeDataProvider";
import { explorerNodeManager } from "./explorer/explorerNodeManager";
import showTool from "./commands/showTool";
import searchTool from "./commands/searchTool";
import automatically from "./commands/automatically";

export function activate(context: vscode.ExtensionContext) {
  i18n.init(context.extensionPath);
  explorerNodeManager.initialize();
  devToysTreeDataProvider.initialize(context);

  context.subscriptions.push(
    vscode.commands.registerCommand("devtoys.searchTool", searchTool),
    vscode.commands.registerCommand("devtoys.showTool", showTool(context)),
    vscode.commands.registerCommand(
      "devtoys.automatically",
      automatically(context)
    ),
    vscode.window.createTreeView("github-kejun-devtoys", {
      treeDataProvider: devToysTreeDataProvider,
      showCollapseAll: true,
    })
  );
}

export function deactivate() {}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `extension.activate` | function | No description |
| `extension.deactivate` | function | No description |

## Git History

- Commits: 13
- Authors: 1
- Bug fixes: 1
- Features: 10

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
