<script lang="ts">
  import {
    provideVSCodeDesignSystem,
    vsCodeTextField,
    vsCodeDropdown,
  } from "@vscode/webview-ui-toolkit";
  provideVSCodeDesignSystem().register(vsCodeTextField(), vsCodeDropdown());

  let number2 = "1101";
  $: number8 = binaryToDecimal(number2, 8);
  $: number10 = binaryToDecimal(number2, 10);
  $: number16 = binaryToDecimal(number2, 16);
  $: number32 = binaryToDecimal(number2, 32);
  $: number36 = binaryToDecimal(number2, 36);

  const binaryToDecimal = (binary: string, base: number) => {
    if (binary === "") {
      return 0;
    }
    if (binary.match(/[^01]/)) {
      return 0;
    }
    return parseInt(binary, 2).toString(base);
  };
  const setNumber2 = (value: string, base: number) => {
    if (value === "") {
      number2 = "0";
      return;
    }
    number2 = parseInt(value, base).toString(2);
  };
</script>

<h1>Number Base</h1>
<vscode-text-field
  value={number2}
  on:input={({ target }) => (number2 = target.value)}
  class="w-full"
>
  2 进制
</vscode-text-field>
<vscode-text-field
  value={number8}
  on:input={({ target }) => setNumber2(target.value, 8)}
  class="w-full"
>
  8 进制
</vscode-text-field>
<vscode-text-field
  value={number10}
  on:input={({ target }) => setNumber2(target.value, 10)}
  class="w-full"
>
  10 进制
</vscode-text-field>
<vscode-text-field
  value={number16}
  on:input={({ target }) => setNumber2(target.value, 16)}
  class="w-full"
>
  16 进制
</vscode-text-field>
<vscode-text-field
  value={number32}
  on:input={({ target }) => setNumber2(target.value, 32)}
  class="w-full"
>
  32 进制
</vscode-text-field>
<vscode-text-field
  value={number36}
  on:input={({ target }) => setNumber2(target.value, 36)}
  class="w-full"
>
  36 进制
</vscode-text-field>

<style>
  .w-full {
    width: 100%;
  }
</style>
