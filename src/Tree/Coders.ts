import { PanelType } from "../common/IToolData";
import { ToolGrpupProvider } from "../common/ToolGroup";
import i18n from "../i18n";
export class CodersProvider extends ToolGrpupProvider {
  constructor() {
    super([
      {
        label: i18n.t("view.devtoys.coders.base64.label"),
        tooltip: i18n.t("view.devtoys.coders.base64.tooltip"),
        panel: PanelType.base64,
      },
      {
        label: i18n.t("view.devtoys.coders.html.label"),
        tooltip: i18n.t("view.devtoys.coders.html.tooltip"),
        panel: PanelType.html,
      },
    ]);
  }
}
