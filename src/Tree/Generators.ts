import { PanelType } from "../common/IToolData";
import { ToolGrpupProvider } from "../common/ToolGroup";
import i18n from "../i18n";

export class GeneratorsProvider extends ToolGrpupProvider {
  constructor() {
    super([
      {
        label: i18n.t("view.devtoys.generators.uuid.label"),
        tooltip: i18n.t("view.devtoys.generators.uuid.tooltip"),
        panel: PanelType.uuid,
      },
    ]);
  }
}
