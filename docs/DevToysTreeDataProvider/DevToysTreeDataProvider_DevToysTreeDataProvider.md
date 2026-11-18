# DevToysTreeDataProvider.DevToysTreeDataProvider

- **Type:** class
- **Language:** typescript
- **File:** `\src\explorer\DevToysTreeDataProvider.ts` (lines 6-65)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class DevToysTreeDataProvider
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
          return explorerNodeManager.getOthersNodes();
        default:
          return [];
      }
    }
  }
}
```

## Docstring

_No docstring provided._

## Source

```
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
          return explorerNodeManager.getOthersNodes();
        default:
          return [];
      }
    }
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
