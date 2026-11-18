# Module: DevToysNode

**File:** `\src\explorer\DevToysNode.ts`

## Overview

Module `DevToysNode` contains 1 analyzed entities.

```
import { Command } from "vscode";
import { Category, IToolData, PanelType } from "../shared";
import * as vscode from "vscode";
export class DevToysNode {
  constructor(private data: IToolData, private isToolNode: boolean = true) {}

  public get label(): string {
    return this.data.label;
  }

  public get tooltip(): string {
    return this.data.tooltip;
  }

  public get panel(): PanelType | Category {
    return this.data.panel;
  }

  public get iconPath():
    | string
    | vscode.Uri
    | {
        light: string | vscode.Uri;
        dark: string | vscode.Uri;
      }
    | vscode.ThemeIcon
    | undefined {
    return this.data.iconPath;
  }

  public get isTool(): boolean {
    return this.isToolNode;
  }

  public get openCommand(): Command {
    return {
      title: "Open Tool",
      command: "devtoys.showTool",
      arguments: [this],
    };
  }
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `DevToysNode.DevToysNode` | class | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
