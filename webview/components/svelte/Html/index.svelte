<script lang="ts">
  import { encode, decode } from "./he";
  import { _ } from "svelte-i18n";

  import {
    vsCodeTextArea,
    vsCodeCheckbox,
    provideVSCodeDesignSystem,
  } from "@vscode/webview-ui-toolkit";
  import { onMount } from "svelte";
  provideVSCodeDesignSystem().register(vsCodeTextArea(), vsCodeCheckbox());

  let useNamedReferences = true;
  let decimal = false;
  let encodeEverything = false;
  let source = "<html>Hi!</html>";
  let coder = "";

  function updateCoderText() {
    coder = encode(source, {
      useNamedReferences,
      decimal,
      encodeEverything,
    });
  }
  onMount(() => {
    updateCoderText();
  });
</script>

<h1>{$_("tool.html.title")}</h1>

<vscode-checkbox
  checked={useNamedReferences}
  on:change={({ target }) => {
    useNamedReferences = target.checked;
    updateCoderText();
  }}>{$_("tool.html.useNameReferencesCheckbox.label")}</vscode-checkbox
>
<vscode-checkbox
  checked={decimal}
  on:change={({ target }) => {
    decimal = target.checked;
    updateCoderText();
  }}>{$_("tool.html.decimalCheckbox.label")}</vscode-checkbox
>
<vscode-checkbox
  checked={encodeEverything}
  on:change={({ target }) => {
    encodeEverything = target.checked;
    updateCoderText();
  }}>{$_("tool.html.encodeEverythingCheckbox.label")}</vscode-checkbox
>
<vscode-text-area
  value={source}
  on:input={({ target }) => {
    source = target.value;
    coder = encode(source, {
      useNamedReferences,
      decimal,
      encodeEverything,
    });
  }}
  style="width: 100%;"
  resize="none"
  rows="10"
  placeholder={$_("tool.html.sourceTextArea.placeholder")}
>
  {$_("tool.html.sourceTextArea.label")}
</vscode-text-area>
<vscode-text-area
  value={coder}
  on:input={({ target }) => {
    coder = target.value;
    source = decode(target.value);
  }}
  style="width: 100%;"
  resize="none"
  rows="10"
  placeholder={$_("tool.html.coderTextArea.placeholder")}
>
  {$_("tool.html.coderTextArea.label")}
</vscode-text-area>
