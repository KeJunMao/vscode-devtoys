enum PanelType {
  jsonToYaml = "jsonToYaml",
  numberBase = "numberBase",
  base64 = "base64",
  uuid = "uuid",
  html = "html",
}

export { PanelType };
export interface IToolData {
  label: string;
  tooltip: string;
  panel: PanelType;
}
