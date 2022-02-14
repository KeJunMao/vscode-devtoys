import { PanelType } from "../common/IToolData";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";

export class NumberBase extends ToolPanel {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.numberBase);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    ToolPanel.createOrShow(extensionUri, PanelType.numberBase, "Number Base");
  }
}
