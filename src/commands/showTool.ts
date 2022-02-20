import { DevToysNode } from "../explorer/DevToysNode";
import { Base64 } from "../Panel/base64";
import { ColorBlindnessSimulator } from "../Panel/ColorBlindnessSimulator";
import { Hash } from "../Panel/Hash";
import { Html } from "../Panel/Html";
import { JsonToYaml } from "../Panel/JsonToYaml";
import { NumberBase } from "../Panel/NumberBase";
import { RegexTester } from "../Panel/RegexTester";
import { Url } from "../Panel/Url";
import { UUID } from "../Panel/UUID";
import { PanelType } from "../shared";
import * as vscode from "vscode";
import { Jwt } from "../Panel/Jwt";
import { Qrcode } from "../Panel/Qrcode";

export default (context: vscode.ExtensionContext) => (node?: DevToysNode) => {
  if (!node) {
    return;
  }
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
    case PanelType.jwt:
      Jwt.createOrShow(context.extensionUri);
      break;
    case PanelType.qrcode:
      Qrcode.createOrShow(context.extensionUri);
      break;
  }
};
