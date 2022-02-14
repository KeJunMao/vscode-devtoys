import { PanelType } from "../common/IToolData";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";

export class NumberBase extends ToolPanel<NumberBase> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.numberBase);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.numberBase,
      "Number Base",
      NumberBase
    );
  }

  public dispose(): void {
    super.dispose();
    NumberBase.currentPanel = undefined;
  }
}
