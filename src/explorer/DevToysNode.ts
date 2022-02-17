import { Command } from "vscode";
import { Category, IToolData, PanelType } from "../shared";

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
