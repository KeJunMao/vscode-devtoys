import { PanelType } from "../common/IToolData";
import { ToolGrpupProvider } from "../common/ToolGroup";

export class GeneratorsProvider extends ToolGrpupProvider {
  constructor() {
    super([
      {
        label: "UUID",
        tooltip: "Generate UUID 1 and 5",
        panel: PanelType.uuid,
      },
    ]);
  }
}
