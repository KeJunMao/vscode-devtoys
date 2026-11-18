# Module: DevToysTreeDataProvider

**File:** `\src\explorer\DevToysTreeDataProvider.ts`

## Overview

Module `DevToysTreeDataProvider` contains 1 analyzed entities.

```
import * as vscode from "vscode";
import { Category } from "../shared";
import { DevToysNode } from "./DevToysNode";
import { explorerNodeManager } from "./explorerNodeManager";

export class DevToysTreeDataProvider
  implements vscode.TreeDataProvider<DevToysNode>
{
  private context!: vscode.ExtensionContext;

  private onDidChangeTreeDataEvent: vscode.EventEmitter<
    DevToysNode | undefined | null
  > = new vscode.EventEmitter<DevToysNode | undefined | null>();
  // tslint:disable-next-line:member-ordering
  public readonly onDidChangeTreeData: vscode.Event<any> =
    this.onDidChangeTreeDataEvent.event;

  public initialize(context: vscode.ExtensionContext): void {
    this.context = context;
  }

  public getTreeItem(
    element: DevToysNode
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return {
      label: element.label,
      tooltip: element.tooltip,
      collapsibleState: element.isTool
        ? vscode.TreeItemCollapsibleState.None
        : vscode.TreeItemCollapsibleState.Collapsed,
      iconPath: element.iconPath,
      command: element.isTool ? element.openCommand : undefined,
    };
  }

  public getChildren(
    element?: DevToysNode | undefined
  ): vscode.ProviderResult<DevToysNode[]> {
    if (!element) {
      // Root view
      return explorerNodeManager.getRootNodes();
    } else {
      switch (
        element.panel // First-level
      ) {
        case Category.all:
          return explorerNodeManager.getAllNodes();
        case Category.convertors:
          return explorerNodeManager.getConvertorsNodes();
        case Category.coders:
          return explorerNodeManager.getCodersNodes();
        case Category.generators:
          return explorerNodeManager.getGeneratorsNodes();
        case Category.text:
          return explorerNodeManager.getTextNodes();
        case Category.graphic:
          return explorerNodeManager.getGraphicNodes();
        case Category.others:
          return explorerNodeManager.getOthersNodes
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `DevToysTreeDataProvider.DevToysTreeDataProvider` | class | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
