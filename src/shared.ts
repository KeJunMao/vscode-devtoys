import { ThemeIcon, Uri } from "vscode";

export enum PanelType {
  null = 0,
  jsonToYaml = "jsonToYaml",
  numberBase = "numberBase",
  base64 = "base64",
  uuid = "uuid",
  html = "html",
  url = "url",
  hash = "hash",
  regexTester = "regexTester",
  colorBlindnessSimulator = "colorBlindnessSimulator",
  jwt = "jwt",
  qrcode = "qrcode",
  timestamp = "timestamp",
  cron = "cron",
}

export enum Category {
  all = "rootAll",
  coders = "rootCoders",
  convertors = "rootConvertors",
  generators = "rootGenerators",
  text = "rootText",
  graphic = "rootGraphic",
  others = "rootOthers",
}

export interface IToolData {
  label: string;
  tooltip: string;
  panel: PanelType | Category;
  iconPath?:
    | string
    | Uri
    | { light: string | Uri; dark: string | Uri }
    | ThemeIcon;
}
