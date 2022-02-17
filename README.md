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

> Unlimited quality, quantity required, welcome contribution, use **React** or **Svelte**

### Add New Tool

example add **JWT Encoder/Decoder** tool

1. `yarn new`

```
❯ yarn new
? Tool label JWT
? Tool panel title JWT Encoder/Decoder
? Tool category Encoder/Decoder
? Tool webview framework React
✔  ++ /svelte-stuff/pages/Jwt.tsx
✔  ++ /svelte-stuff/components/Jwt/index.tsx
✔  ++ /src/Panel/Jwt.ts
✔  ++ /svelte-stuff/components/Jwt/locales/en.json
✔  ++ /svelte-stuff/components/Jwt/locales/zh-CN.json
✔  ++ /svelte-stuff/components/Jwt/i18n.ts
✨  Done in 15.52s.
```

2. add `PanelType` in `src/shared.ts`

```ts
enum PanelType {
  ...,
  jwt = "jwt"
}
```

3. add tree item in `src/explorer/explorerNodeManager.ts`,JWT tool is in Coders category,so edit

```ts
 const coders: IToolData[] = [
  ...,
  {
    label: i18n.t("view.devtoys.coders.jwt.label"),
    tooltip: i18n.t("view.devtoys.coders.jwt.tooltip"),
    panel: PanelType.jwt,
  }
]
```

4. show tool in `src/extension.ts`

```ts
vscode.commands.registerCommand("devtoys.showTool", (node: DevToysNode) => {
  switch (node.type) {
    ...
    case PanelType.jwt:
      jwt.createOrShow(context.extensionUri);
      break;
  }
})
```

5. Make JWT tool and I18N key, and then test the tool!

> NOTE: webview i18n file in `svelte-stuff/components/TOOLNAME/locales`, extension i18n file in `locales`
