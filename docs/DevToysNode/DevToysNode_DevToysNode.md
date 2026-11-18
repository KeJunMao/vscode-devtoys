# DevToysNode.DevToysNode

- **Type:** class
- **Language:** typescript
- **File:** `\src\explorer\DevToysNode.ts` (lines 4-42)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class DevToysNode {
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

## Docstring

_No docstring provided._

## Source

```
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

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 1

## Callers

None

## Callees

None
