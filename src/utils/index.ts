import { IToolData, PanelType } from "../common/IToolData";

export function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getToolDataByPanelType(
  panelType: PanelType,
  toolData: IToolData[]
) {
  return toolData.find((d) => d.panel === panelType);
}
