# RegexTester.RegexTester

- **Type:** class
- **Language:** typescript
- **File:** `\src\Panel\RegexTester.ts` (lines 6-27)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class RegexTester extends ToolPanel<RegexTester> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.regexTester);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.regexTester,
      i18n.t("view.devtoys.text.regexTester.panel.title"),
      RegexTester
    );
  }
  public static canBeTreatedByTool(data: string): boolean | PanelType {
    let result = /^\/.*\/[gimsuy]*$/.test(data);
    return result ? PanelType.regexTester : false;
  }
  public dispose(): void {
    super.dispose();
    RegexTester.currentPanel = undefined;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export class RegexTester extends ToolPanel<RegexTester> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.regexTester);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.regexTester,
      i18n.t("view.devtoys.text.regexTester.panel.title"),
      RegexTester
    );
  }
  public static canBeTreatedByTool(data: string): boolean | PanelType {
    let result = /^\/.*\/[gimsuy]*$/.test(data);
    return result ? PanelType.regexTester : false;
  }
  public dispose(): void {
    super.dispose();
    RegexTester.currentPanel = undefined;
  }
}
```

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 0
- Features: 2

## Callers

None

## Callees

None
