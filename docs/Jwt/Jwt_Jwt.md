# Jwt.Jwt

- **Type:** class
- **Language:** typescript
- **File:** `\src\Panel\Jwt.ts` (lines 6-31)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class Jwt extends ToolPanel<Jwt> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.jwt, "vue");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.base64,
      i18n.t("view.devtoys.coders.jwt.panel.title"),
      Jwt
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    let result = /(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/.test(
      data
    );
    return result ? PanelType.jwt : false;
  }

  public dispose(): void {
    super.dispose();
    Jwt.currentPanel = undefined;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export class Jwt extends ToolPanel<Jwt> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.jwt, "vue");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.base64,
      i18n.t("view.devtoys.coders.jwt.panel.title"),
      Jwt
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    let result = /(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/.test(
      data
    );
    return result ? PanelType.jwt : false;
  }

  public dispose(): void {
    super.dispose();
    Jwt.currentPanel = undefined;
  }
}
```

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 0
- Features: 3

## Callers

None

## Callees

None
