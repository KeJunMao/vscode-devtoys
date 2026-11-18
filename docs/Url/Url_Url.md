# Url.Url

- **Type:** class
- **Language:** typescript
- **File:** `\src\Panel\Url.ts` (lines 6-32)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class Url extends ToolPanel<Url> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.url);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.url,
      i18n.t("view.devtoys.Coders.url.panel.title"),
      Url
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    const result =
      /^(((ht|f)tps?):\/\/)([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
        data
      );
    return result ? PanelType.url : false;
  }

  public dispose(): void {
    super.dispose();
    Url.currentPanel = undefined;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export class Url extends ToolPanel<Url> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.url);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.url,
      i18n.t("view.devtoys.Coders.url.panel.title"),
      Url
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    const result =
      /^(((ht|f)tps?):\/\/)([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
        data
      );
    return result ? PanelType.url : false;
  }

  public dispose(): void {
    super.dispose();
    Url.currentPanel = undefined;
  }
}
```

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 0
- Features: 3

## Callers

None

## Callees

None
