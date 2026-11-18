# Html.Html

- **Type:** class
- **Language:** typescript
- **File:** `\src\Panel\Html.ts` (lines 6-29)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class Html extends ToolPanel<Html> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.html, "svelte");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.html,
      i18n.t("view.devtoys.coders.html.panel.title"),
      Html
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    let result = /<(\w+)[^>]*>(.*?<\/\1>)?/.test(data);
    return result ? PanelType.html : false;
  }

  public dispose(): void {
    super.dispose();
    Html.currentPanel = undefined;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export class Html extends ToolPanel<Html> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.html, "svelte");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.html,
      i18n.t("view.devtoys.coders.html.panel.title"),
      Html
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    let result = /<(\w+)[^>]*>(.*?<\/\1>)?/.test(data);
    return result ? PanelType.html : false;
  }

  public dispose(): void {
    super.dispose();
    Html.currentPanel = undefined;
  }
}
```

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 0
- Features: 2

## Callers

None

## Callees

None
