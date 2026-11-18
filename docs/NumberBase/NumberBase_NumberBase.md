# NumberBase.NumberBase

- **Type:** class
- **Language:** typescript
- **File:** `\src\Panel\NumberBase.ts` (lines 6-29)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class NumberBase extends ToolPanel<NumberBase> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.numberBase, "svelte");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.numberBase,
      i18n.t("view.devtoys.convertors.numberBase.panel.title"),
      NumberBase
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    let result = /^[0-9a-fA-F]+$/.test(data);
    return result ? PanelType.numberBase : false;
  }

  public dispose(): void {
    super.dispose();
    NumberBase.currentPanel = undefined;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export class NumberBase extends ToolPanel<NumberBase> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.numberBase, "svelte");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.numberBase,
      i18n.t("view.devtoys.convertors.numberBase.panel.title"),
      NumberBase
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    let result = /^[0-9a-fA-F]+$/.test(data);
    return result ? PanelType.numberBase : false;
  }

  public dispose(): void {
    super.dispose();
    NumberBase.currentPanel = undefined;
  }
}
```

## Git History

- Commits: 6
- Authors: 1
- Bug fixes: 1
- Features: 3

## Callers

None

## Callees

None
