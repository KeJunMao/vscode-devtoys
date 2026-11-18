# Timestamp.Timestamp

- **Type:** class
- **Language:** typescript
- **File:** `\src\Panel\Timestamp.ts` (lines 7-39)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class Timestamp extends ToolPanel<Timestamp> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.timestamp, "vue");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.timestamp,
      i18n.t("view.devtoys.convertors.timestamp.panel.title"),
      Timestamp
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    try {
      const d = new Date(data);
      const e = new Date(Number(data));
      if (isValidDate(d) || isValidDate(e)) {
        return PanelType.timestamp;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  public dispose(): void {
    super.dispose();
    Timestamp.currentPanel = undefined;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export class Timestamp extends ToolPanel<Timestamp> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.timestamp, "vue");
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.timestamp,
      i18n.t("view.devtoys.convertors.timestamp.panel.title"),
      Timestamp
    );
  }

  public static canBeTreatedByTool(data: string): boolean | PanelType {
    try {
      const d = new Date(data);
      const e = new Date(Number(data));
      if (isValidDate(d) || isValidDate(e)) {
        return PanelType.timestamp;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  public dispose(): void {
    super.dispose();
    Timestamp.currentPanel = undefined;
  }
}
```

## Git History

- Commits: 3
- Authors: 2
- Bug fixes: 1
- Features: 2

## Callers

None

## Callees

None
