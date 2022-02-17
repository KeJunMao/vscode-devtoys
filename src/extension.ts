import * as vscode from "vscode";
import { Base64 } from "./Panel/base64";
import { JsonToYaml } from "./Panel/JsonToYaml";
import { NumberBase } from "./Panel/NumberBase";
import { UUID } from "./Panel/UUID";
import { Html } from "./Panel/Html";
import i18n from "./i18n";
import { Url } from "./Panel/Url";
import { Hash } from "./Panel/Hash";
import { RegexTester } from "./Panel/RegexTester";
import { ColorBlindnessSimulator } from "./Panel/ColorBlindnessSimulator";
import { devToysTreeDataProvider } from "./explorer/DevToysTreeDataProvider";
import { explorerNodeManager } from "./explorer/explorerNodeManager";
import { DevToysNode } from "./explorer/DevToysNode";
import { PanelType } from "./shared";

export function activate(context: vscode.ExtensionContext) {
  i18n.init(context.extensionPath);
  explorerNodeManager.initialize();
  devToysTreeDataProvider.initialize(context);

  context.subscriptions.push(
    vscode.commands.registerCommand("devtoys.searchTool", () => {
      const choice = vscode.window.showQuickPick(
        explorerNodeManager.getAllNodes().map((node) => ({
          label: node.label,
          description: node.tooltip,
          detail: node.panel as string,
          value: node,
        })),
        {
          matchOnDescription: true,
          matchOnDetail: true,
          placeHolder: i18n.t("command.devtoys.searchTool.placeHolder"),
        }
      );
      if (!choice) {
        return;
      }
      choice.then((value) => {
        vscode.commands.executeCommand("devtoys.showTool", value?.value);
      });
    }),
    vscode.commands.registerCommand("devtoys.showTool", (node: DevToysNode) => {
      switch (node.panel) {
        case PanelType.jsonToYaml:
          JsonToYaml.createOrShow(context.extensionUri);
          break;
        case PanelType.numberBase:
          NumberBase.createOrShow(context.extensionUri);
          break;
        case PanelType.base64:
          Base64.createOrShow(context.extensionUri);
          break;
        case PanelType.uuid:
          UUID.createOrShow(context.extensionUri);
          break;
        case PanelType.html:
          Html.createOrShow(context.extensionUri);
          break;
        case PanelType.url:
          Url.createOrShow(context.extensionUri);
          break;
        case PanelType.hash:
          Hash.createOrShow(context.extensionUri);
          break;
        case PanelType.regexTester:
          RegexTester.createOrShow(context.extensionUri);
          break;
        case PanelType.colorBlindnessSimulator:
          ColorBlindnessSimulator.createOrShow(context.extensionUri);
          break;
      }
    }),
    vscode.window.createTreeView("github-kejun-devtoys", {
      treeDataProvider: devToysTreeDataProvider,
      showCollapseAll: true,
    })
  );
}

export function deactivate() {}
