import { PanelType } from "../shared";
import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import i18n from "../i18n";
// import { parse as YAMLParse } from "yaml";
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

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    let result = false;
    try {
      JSON.parse(data);
      result = true;
    } catch (e) {
      // TODO: mabe we have check if it is yaml or best func?
      // now we just skip check and return false
      // try {
      //   // 4+ line yaml
      //   if (data.split("\n").length > 4) {
      //     YAMLParse(data);
      //     result = true;
      //   } else {
      //     result = false;
      //   }
      // } catch (e) {
      //   result = false;
      // }
      result = false;
    }
    return result ? PanelType.jsonToYaml : false;
  }

  public dispose(): void {
    super.dispose();
    JsonToYaml.currentPanel = undefined;
  }
}

ToolPanel.allPanel.add(JsonToYaml);
