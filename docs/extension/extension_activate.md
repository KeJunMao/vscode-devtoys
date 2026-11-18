# extension.activate

- **Type:** function
- **Language:** typescript
- **File:** `\src\extension.ts` (lines 9-26)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function activate(context: vscode.ExtensionContext) {
  i18n.init(context.extensionPath);
  explorerNodeManager.initialize();
  devToysTreeDataProvider.initialize(context);

  context.subscriptions.push(
    vscode.commands.registerCommand("devtoys.searchTool", searchTool),
    vscode.commands.registerCommand("devtoys.showTool", showTool(context)),
    vscode.commands.registerCommand(
      "devtoys.automatically",
      automatically(context)
    ),
    vscode.window.createTreeView("github-kejun-devtoys", {
      treeDataProvider: devToysTreeDataProvider,
      showCollapseAll: true,
    })
  );
}
```

## Docstring

_No docstring provided._

## Source

```
export function activate(context: vscode.ExtensionContext) {
  i18n.init(context.extensionPath);
  explorerNodeManager.initialize();
  devToysTreeDataProvider.initialize(context);

  context.subscriptions.push(
    vscode.commands.registerCommand("devtoys.searchTool", searchTool),
    vscode.commands.registerCommand("devtoys.showTool", showTool(context)),
    vscode.commands.registerCommand(
      "devtoys.automatically",
      automatically(context)
    ),
    vscode.window.createTreeView("github-kejun-devtoys", {
      treeDataProvider: devToysTreeDataProvider,
      showCollapseAll: true,
    })
  );
}
```

## Git History

- Commits: 13
- Authors: 1
- Bug fixes: 1
- Features: 10

## Callers

None

## Callees

None
