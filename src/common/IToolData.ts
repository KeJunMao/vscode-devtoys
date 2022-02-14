enum PanelType {
  jsonToYaml = "jsonToYaml",
  numberBase = "numberBase",
}

export { PanelType };
export interface IToolData {
  label: string;
  tooltip: string;
  panel: PanelType;
}
