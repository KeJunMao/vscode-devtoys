import * as vscode from "vscode";
import { JsonToYaml } from "./Panel/JsonToYaml";
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
    vscode.commands.registerCommand("devtoys.showTool", (data) => {
      JsonToYaml.createOrShow(context.extensionUri);
    })
  );
}

export function deactivate() {}
