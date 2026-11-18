# ColorBlindnessSimulator.ColorBlindnessSimulator

- **Type:** class
- **Language:** typescript
- **File:** `\src\Panel\ColorBlindnessSimulator.ts` (lines 6-24)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class ColorBlindnessSimulator extends ToolPanel<ColorBlindnessSimulator> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.colorBlindnessSimulator);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.colorBlindnessSimulator,
      i18n.t("view.devtoys.Graphic.colorBlindnessSimulator.panel.title"),
      ColorBlindnessSimulator
    );
  }

  public dispose(): void {
    super.dispose();
    ColorBlindnessSimulator.currentPanel = undefined;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export class ColorBlindnessSimulator extends ToolPanel<ColorBlindnessSimulator> {
  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    super(panel, extensionUri, PanelType.colorBlindnessSimulator);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    super.createOrShow(
      extensionUri,
      PanelType.colorBlindnessSimulator,
      i18n.t("view.devtoys.Graphic.colorBlindnessSimulator.panel.title"),
      ColorBlindnessSimulator
    );
  }

  public dispose(): void {
    super.dispose();
    ColorBlindnessSimulator.currentPanel = undefined;
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
