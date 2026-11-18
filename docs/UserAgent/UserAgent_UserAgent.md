# UserAgent.UserAgent

- **Type:** class
- **Language:** typescript
- **File:** `\src\Panel\UserAgent.ts` (lines 6-24)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class UserAgent extends ToolPanel<UserAgent> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.userAgent, "react");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.userAgent,
      i18n.t("view.devtoys.others.userAgent.panel.title"),
      UserAgent
    );
  }

  public dispose(): void {
    super.dispose();
    UserAgent.currentPanel = undefined;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export class UserAgent extends ToolPanel<UserAgent> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.userAgent, "react");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.userAgent,
      i18n.t("view.devtoys.others.userAgent.panel.title"),
      UserAgent
    );
  }

  public dispose(): void {
    super.dispose();
    UserAgent.currentPanel = undefined;
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
