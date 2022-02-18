import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";

export class JsonToYaml extends ToolPanel<JsonToYaml> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.jsonToYaml, "svelte");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.jsonToYaml,
      i18n.t("view.devtoys.convertors.jsonToYaml.panel.title"),
      JsonToYaml
    );
  }

  public dispose(): void {
    super.dispose();
    JsonToYaml.currentPanel = undefined;
  }
}
