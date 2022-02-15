<p align="center">
  <img width="128" align="center" src="media/icon.png">
</p>
<h1 align="center">
  DevToys for VSCode
</h1>
<p align="center">
  A Swiss Army knife for developers.This is the vscode extension version of <a href='https://github.com/veler/DevToys'>Devtoys</a>!
</p>
<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=kejun.devtoys">
    <img src="https://img.shields.io/visual-studio-marketplace/d/kejun.devtoys.svg?style=flat-square" alt="">
  </a>
  <a href="https://github.com/KeJunMao/vscode-devtoys/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/KeJunMao/vscode-devtoys.svg?style=flat-square" alt="">
  </a>
</p>

## Development

To set up your environment to develop DevToys, run `yarn`.

### Add New Tool

example add **URL Encoder/Decoder** tool

1. `yarn new`

```
❯ yarn new
? Tool label URL
? Tool panel title URL Encoder/Decoder
? Tool category Encoder/Decoder
✔  ++ /svelte-stuff/pages/Url.ts
✔  ++ /svelte-stuff/components/Url/index.svelte
✔  ++ /src/Panel/Url.ts
✔  ++ /svelte-stuff/components/Url/locales/en.json
✔  ++ /svelte-stuff/components/Url/locales/zh-CN.json
✔  ++ /svelte-stuff/components/Url/i18n.ts
✨  Done in 16.82s.
```

2. add `PanelType` in `src/common/IToolData.ts`

```ts
enum PanelType {
  ...,
  url = "url"
}
```

3. add tree item in `src/Tree`, URL tool is in Coders category,so edit `src/Tree/Coders.ts`

```ts
export class CodersProvider extends ToolGrpupProvider {
  constructor() {
    super([
      ...,
      {
        label: i18n.t("view.devtoys.coders.url.label"),
        tooltip: i18n.t("view.devtoys.coders.url.tooltip"),
        panel: PanelType.url,
      }
    ]);
  }
}
```

4. show tool in `src/extension.ts`

```ts
vscode.commands.registerCommand("devtoys.showTool", (type: PanelType) => {
  switch (type) {
    ...
    case PanelType.html:
      Url.createOrShow(context.extensionUri);
      break;
  }
})
```

5. Make URL tool and I18N key, and then test the tool!

> NOTE: webview i18n file in `svelte-stuff/components/TOOLNAME/locales`, extension i18n file in `locales`
