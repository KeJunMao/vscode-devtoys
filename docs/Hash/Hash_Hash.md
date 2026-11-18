# Hash.Hash

- **Type:** class
- **Language:** typescript
- **File:** `\src\Panel\Hash.ts` (lines 6-24)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class Hash extends ToolPanel<Hash> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.hash);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.hash,
      i18n.t("view.devtoys.Generators.hash.panel.title"),
      Hash
    );
  }

  public dispose(): void {
    super.dispose();
    Hash.currentPanel = undefined;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export class Hash extends ToolPanel<Hash> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.hash);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.hash,
      i18n.t("view.devtoys.Generators.hash.panel.title"),
      Hash
    );
  }

  public dispose(): void {
    super.dispose();
    Hash.currentPanel = undefined;
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
