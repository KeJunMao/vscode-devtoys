import { PanelType } from "../common/IToolData";
import { ToolGrpupProvider } from "../common/ToolGroup";

export class CodersProvider extends ToolGrpupProvider {
  constructor() {
    super([
      {
        label: "Base64",
        tooltip: "Encode/Decode Base64",
        panel: PanelType.base64,
      },
    ]);
  }
}
