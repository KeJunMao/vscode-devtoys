import { PanelType } from "../common/IToolData";
import { ToolGrpupProvider } from "../common/ToolGroup";

export class ConvertorsProvider extends ToolGrpupProvider {
  constructor() {
    super([
      {
        label: "JSON < > YAML",
        tooltip: "Convert JSON to YAML",
        panel: PanelType.jsonToYaml,
      },
      {
        label: "Number Base",
        tooltip: "Convert Number Base",
        panel: PanelType.numberBase,
      },
    ]);
  }
}
