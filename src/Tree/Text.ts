import { PanelType } from "../common/IToolData";
import { ToolGrpupProvider } from "../common/ToolGroup";
import i18n from "../i18n";

export class TextProvider extends ToolGrpupProvider {
  constructor() {
    super([
      {
        label: i18n.t("view.devtoys.text.regexTester.label"),
        tooltip: i18n.t("view.devtoys.text.regexTester.tooltip"),
        panel: PanelType.regexTester,
      },
    ]);
  }
}
