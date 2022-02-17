import * as vscode from "vscode";
import { PanelType } from "./common/IToolData";
import { Base64 } from "./Panel/base64";
import { JsonToYaml } from "./Panel/JsonToYaml";
import { NumberBase } from "./Panel/NumberBase";
import { UUID } from "./Panel/UUID";
import { CodersProvider } from "./Tree/Coders";
import { ConvertorsProvider } from "./Tree/Convertors";
import { GeneratorsProvider } from "./Tree/Generators";
import { Html } from "./Panel/Html";
import i18n from "./i18n";
import { Url } from "./Panel/Url";
import { Hash } from "./Panel/Hash";
import { RegexTester } from "./Panel/RegexTester";
import { TextProvider } from "./Tree/Text";

export function activate(context: vscode.ExtensionContext) {
  i18n.init(context.extensionPath);

  const convertorsProvider = new ConvertorsProvider();
  vscode.window.registerTreeDataProvider(
    "github-kejun-devtoys-convertors",
    convertorsProvider
  );

  const codersProvider = new CodersProvider();
  vscode.window.registerTreeDataProvider(
    "github-kejun-devtoys-coders",
    codersProvider
  );

  const generatorsProvider = new GeneratorsProvider();
  vscode.window.registerTreeDataProvider(
    "github-kejun-devtoys-generators",
    generatorsProvider
  );

  const textProvider = new TextProvider();
  vscode.window.registerTreeDataProvider(
    "github-kejun-devtoys-text",
    textProvider
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("devtoys.showTool", (type: PanelType) => {
      switch (type) {
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
      }
    })
  );
}

export function deactivate() {}
