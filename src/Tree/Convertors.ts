import { PanelType } from "../common/IToolData";
import { ToolGrpupProvider } from "../common/ToolGroup";
import i18n from "../i18n";

export class ConvertorsProvider extends ToolGrpupProvider {
  constructor() {
    super([
      {
        label: i18n.t("view.devtoys.convertors.jsonToYaml.label"),
        tooltip: i18n.t("view.devtoys.convertors.jsonToYaml.tooltip"),
        panel: PanelType.jsonToYaml,
      },
      {
        label: i18n.t("view.devtoys.convertors.numberBase.label"),
        tooltip: i18n.t("view.devtoys.convertors.numberBase.tooltip"),
        panel: PanelType.numberBase,
      },
    ]);
  }
}
