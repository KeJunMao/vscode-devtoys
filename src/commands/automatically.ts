import { ToolPanel } from "../common/ToolPanel";
import * as vscode from "vscode";
import { asyncFilter } from "../utils";
import { PanelType } from "../shared";
import { explorerNodeManager } from "../explorer/explorerNodeManager";
import searchTool from "./searchTool";
import { DevToysNode } from "../explorer/DevToysNode";
import showTool from "./showTool";
import i18n from "../i18n";

export default (context: vscode.ExtensionContext) => async () => {
  const matchedToolPanels: {
    panelClass: any;
    panelType: PanelType;
    clipbordData: string;
  }[] = [];
  await asyncFilter(Array.from(ToolPanel.allPanel), async (panel) => {
    const data = await vscode.env.clipboard.readText();
    const canBeTreated = panel.canBeTreatedByTool(data);
    if (canBeTreated !== false) {
      matchedToolPanels.push({
        panelClass: panel,
        panelType: canBeTreated,
        clipbordData: data,
      });
    }
    return canBeTreated;
  });
  if (matchedToolPanels.length === 0) {
    vscode.window.showInformationMessage(
      i18n.t("command.devtoys.automatically.nothing.informationMessage")
    );
    return;
  } else if (matchedToolPanels.length === 1) {
    const data = matchedToolPanels[0];
    showTool(context)(explorerNodeManager.getNodeByPanel(data.panelType));
    // TODO: POST Message
  } else {
    const nodes = matchedToolPanels
      .map((data) => {
        return explorerNodeManager.getNodeByPanel(data.panelType);
      })
      .filter((node) => node !== undefined);
    // jsonToYaml 太容易匹配了，所以如果匹配到了，就把 jsonToYaml 删了
    nodes.splice(
      nodes.indexOf(nodes.find((node) => node?.panel === PanelType.jsonToYaml)),
      1
    );

    if (nodes.length === 1) {
      showTool(context)(nodes[0]);
    } else {
      searchTool(nodes as DevToysNode[]).then(() => {
        // TODO: POST Message
      });
    }
  }
};
