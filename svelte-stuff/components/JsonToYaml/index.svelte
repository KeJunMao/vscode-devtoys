<script lang="ts">
  /// @ts-ignore
  import * as YAML from "yaml/browser/dist/index";
  import { _ } from "svelte-i18n";
  import {
    vsCodeTextArea,
    provideVSCodeDesignSystem,
  } from "@vscode/webview-ui-toolkit";
  provideVSCodeDesignSystem().register(vsCodeTextArea());
  let jsonValue = "";
  let yamlValue = "";

  const covertorJsonStrToYamlStr = (jsonStr: string): string => {
    if (jsonStr.trim() === "") {
      return "";
    }
    try {
      const jsonObj = JSON.parse(jsonStr);
      const yamlStr = YAML.stringify(jsonObj);
      return yamlStr;
    } catch (e) {
      tsvscode.postMessage({ type: "onError", value: String(e) });
      return String(e);
    }
  };
  const covertorYamlStrToJsonStr = (yamlStr: string): string => {
    if (yamlStr.trim() === "") {
      return "";
    }
    try {
      const yamlObj = YAML.parse(yamlStr);
      const jsonStr = JSON.stringify(yamlObj);
      return jsonStr;
    } catch (e) {
      tsvscode.postMessage({ type: "onError", value: String(e) });
      return String(e);
    }
  };
</script>

<h1>{$_("tool.jsonToYaml.title")}</h1>

<vscode-text-area
  value={jsonValue}
  on:input={({ target }) => {
    jsonValue = target.value;
    yamlValue = covertorJsonStrToYamlStr(jsonValue);
  }}
  style="width: 100%;"
  resize="none"
  cols="30"
  rows="10"
  placeholder={$_("tool.jsonToYaml.jsonTextArea.placeholder")}
  >{$_("tool.jsonToYaml.jsonTextArea.label")}</vscode-text-area
>
<br />
<vscode-text-area
  value={yamlValue}
  on:input={({ target }) => {
    yamlValue = target.value;
    jsonValue = covertorYamlStrToJsonStr(yamlValue);
  }}
  style="width: 100%;"
  resize="none"
  cols="30"
  rows="10"
  placeholder={$_("tool.jsonToYaml.yamlTextArea.placeholder")}
  >{$_("tool.jsonToYaml.yamlTextArea.label")}</vscode-text-area
>
