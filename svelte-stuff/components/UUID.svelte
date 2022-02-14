<script lang="ts">
  import * as uuid from "uuid";
  import {
    vsCodeTextArea,
    vsCodeCheckbox,
    vsCodeRadioGroup,
    vsCodeRadio,
    vsCodeTextField,
    provideVSCodeDesignSystem,
  } from "@vscode/webview-ui-toolkit";
  provideVSCodeDesignSystem().register(
    vsCodeTextArea(),
    vsCodeCheckbox(),
    vsCodeRadio(),
    vsCodeRadioGroup(),
    vsCodeTextField()
  );
  let uuidVersion = "4";
  let hasHyphen = true;
  let isUpperCase = false;
  let uuidCount = 5;
  $: uuidText = generateUUID(uuidVersion, hasHyphen, isUpperCase, uuidCount);

  const generateUUID = (
    uuidVersion: string,
    hasHyphen: boolean,
    isUpperCase: boolean,
    uuidCount: number
  ) => {
    let uuidFunc = uuid.v4;
    switch (uuidVersion) {
      case "1":
        uuidFunc = uuid.v1;
        break;
      case "3":
        uuidFunc = uuid.v3;
        break;
      case "4":
        uuidFunc = uuid.v4;
        break;
      case "5":
        uuidFunc = uuid.v5;
        break;
    }
    let uuidString = "";
    for (let i = 0; i < uuidCount; i++) {
      uuidString += uuidFunc() + "\n";
    }
    if (!hasHyphen) {
      uuidString = uuidString.replace(/-/g, "");
    }
    if (isUpperCase) {
      uuidString = uuidString.toUpperCase();
    }
    return uuidString;
  };
</script>

<h1>UUID</h1>
<vscode-checkbox
  checked={hasHyphen}
  on:change={({ target }) => (hasHyphen = target.checked)}
  >分隔符</vscode-checkbox
>
<vscode-checkbox
  checked={isUpperCase}
  on:change={({ target }) => (isUpperCase = target.checked)}
  >大写</vscode-checkbox
>
<vscode-radio-group
  value={uuidVersion}
  on:change={({ target }) => {
    uuidVersion = target.value;
  }}
>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label slot="label">UUID 版本</label>
  <vscode-radio value="1">v1 (timestamp)</vscode-radio>
  <!-- <vscode-radio value="3">v3 (namespace w/ MD5)</vscode-radio> -->
  <vscode-radio value="4">v4 (random)</vscode-radio>
  <!-- <vscode-radio value="5">v5 (namespace w/ SHA-1)</vscode-radio> -->
</vscode-radio-group>
<vscode-text-field
  type="number"
  value={uuidCount}
  on:input={({ target }) => {
    uuidCount = parseInt(target.value);
  }}>size</vscode-text-field
>

<vscode-text-area value={uuidText} style="width: 100%;" readonly rows="10"
  >UUID(s)</vscode-text-area
>
