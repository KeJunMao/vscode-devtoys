# Base64.Base64

- **Type:** class
- **Language:** typescript
- **File:** `\src\Panel\Base64.ts` (lines 6-32)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class Base64 extends ToolPanel<Base64> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.base64, "svelte");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.base64,
      i18n.t("view.devtoys.coders.base64.panel.title"),
      Base64
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    const result =
      /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(
        data
      );
    return result ? PanelType.base64 : false;
  }

  public dispose(): void {
    super.dispose();
    Base64.currentPanel = undefined;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export class Base64 extends ToolPanel<Base64> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.base64, "svelte");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.base64,
      i18n.t("view.devtoys.coders.base64.panel.title"),
      Base64
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    const result =
      /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(
        data
      );
    return result ? PanelType.base64 : false;
  }

  public dispose(): void {
    super.dispose();
    Base64.currentPanel = undefined;
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
