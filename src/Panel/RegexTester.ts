import { PanelType } from "../common/IToolData";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class RegexTester extends ToolPanel<RegexTester> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.regexTester);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.regexTester,
      i18n.t("view.devtoys.text.regexTester.panel.title"),
      RegexTester
    );
  }

  public dispose(): void {
    super.dispose();
    RegexTester.currentPanel = undefined;
  }
}
