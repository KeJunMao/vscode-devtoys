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
          return explorerNodeManager.getOthersNodes();
        default:
          return [];
      }
    }
  }
}

export const devToysTreeDataProvider: DevToysTreeDataProvider =
  new DevToysTreeDataProvider();
