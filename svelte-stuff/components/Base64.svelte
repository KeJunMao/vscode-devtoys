<script lang="ts">
  import {
    vsCodeTextArea,
    provideVSCodeDesignSystem,
  } from "@vscode/webview-ui-toolkit";
  provideVSCodeDesignSystem().register(vsCodeTextArea());
  function utf8_to_b64(str: string) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  function b64_to_utf8(str: string) {
    return decodeURIComponent(escape(window.atob(str)));
  }
  let source = "";
  let base64 = "";
</script>

<h1>Base64</h1>
<vscode-text-area
  value={source}
  on:input={({ target }) => {
    base64 = utf8_to_b64(target.value);
    source = target.value;
  }}
  style="width: 100%;"
  resize="none"
  rows="10"
  placeholder="在这里输入源字符串">source</vscode-text-area
>
<vscode-text-area
  value={base64}
  on:input={({ target }) => {
    source = b64_to_utf8(target.value);
    base64 = target.value;
  }}
  style="width: 100%;"
  resize="none"
  rows="10"
  placeholder="在这里输入base64字符串">base64</vscode-text-area
>
