import * as vscode from "vscode";
import { PanelType } from "./common/IToolData";
import { JsonToYaml } from "./Panel/JsonToYaml";
import { NumberBase } from "./Panel/NumberBase";
import { CodersProvider } from "./Tree/Coders";
import { ConvertorsProvider } from "./Tree/Convertors";
import { GeneratorsProvider } from "./Tree/Generators";
export function activate(context: vscode.ExtensionContext) {
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

  context.subscriptions.push(
    vscode.commands.registerCommand("devtoys.helloWorld", () => {
      vscode.window.showInformationMessage("Hello World from DevToys!");
    })
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
      }
    })
  );
}

export function deactivate() {}
