import { PanelType } from "../common/IToolData";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class ColorBlindnessSimulator extends ToolPanel<ColorBlindnessSimulator> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.colorBlindnessSimulator);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.colorBlindnessSimulator,
      i18n.t("view.devtoys.Graphic.colorBlindnessSimulator.panel.title"),
      ColorBlindnessSimulator
    );
  }

  public dispose(): void {
    super.dispose();
    ColorBlindnessSimulator.currentPanel = undefined;
  }
}
