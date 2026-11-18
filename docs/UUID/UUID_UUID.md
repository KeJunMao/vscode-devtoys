# UUID.UUID

- **Type:** class
- **Language:** typescript
- **File:** `\src\Panel\UUID.ts` (lines 6-24)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class UUID extends ToolPanel<UUID> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.uuid, "svelte");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.uuid,
      i18n.t("view.devtoys.generators.uuid.panel.title"),
      UUID
    );
  }

  public dispose(): void {
    super.dispose();
    UUID.currentPanel = undefined;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export class UUID extends ToolPanel<UUID> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.uuid, "svelte");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.uuid,
      i18n.t("view.devtoys.generators.uuid.panel.title"),
      UUID
    );
  }

  public dispose(): void {
    super.dispose();
    UUID.currentPanel = undefined;
  }
}
```

## Git History

- Commits: 5
- Authors: 1
- Bug fixes: 1
- Features: 2

## Callers

None

## Callees

None
