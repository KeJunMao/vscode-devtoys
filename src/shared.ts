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
}
