import { ToolGrpupProvider } from "../common/ToolGroup";

export class ConvertorsProvider extends ToolGrpupProvider {
  constructor() {
    super([
      {
        label: "JSON to YAML",
        description: "Convert JSON to YAML",
        panel: "jsonToYaml",
      },
    ]);
  }
}
