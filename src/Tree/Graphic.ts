import { PanelType } from "../common/IToolData";
import { ToolGrpupProvider } from "../common/ToolGroup";
import i18n from "../i18n";

export class GraphicProvider extends ToolGrpupProvider {
  constructor() {
    super([
      {
        label: i18n.t("view.devtoys.graphic.colorBlindnessSimulator.label"),
        tooltip: i18n.t("view.devtoys.graphic.colorBlindnessSimulator.tooltip"),
        panel: PanelType.colorBlindnessSimulator,
      },
    ]);
  }
}
