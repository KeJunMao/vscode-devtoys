enum PanelType {
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

export { PanelType };
export interface IToolData {
  label: string;
  tooltip: string;
  panel: PanelType;
}
