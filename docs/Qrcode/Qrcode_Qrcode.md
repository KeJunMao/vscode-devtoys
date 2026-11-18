# Qrcode.Qrcode

- **Type:** class
- **Language:** typescript
- **File:** `\src\Panel\Qrcode.ts` (lines 6-24)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class Qrcode extends ToolPanel<Qrcode> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.qrcode, "vue");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.qrcode,
      i18n.t("view.devtoys.Graphic.qrcode.panel.title"),
      Qrcode
    );
  }

  public dispose(): void {
    super.dispose();
    Qrcode.currentPanel = undefined;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export class Qrcode extends ToolPanel<Qrcode> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.qrcode, "vue");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.qrcode,
      i18n.t("view.devtoys.Graphic.qrcode.panel.title"),
      Qrcode
    );
  }

  public dispose(): void {
    super.dispose();
    Qrcode.currentPanel = undefined;
  }
}
```

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 1

## Callers

None

## Callees

None
