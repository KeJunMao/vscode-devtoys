# Architecture: vscode-devtoys

## What this project is
`vscode-devtoys` is a Visual Studio Code extension that provides a collection of tools and utilities for developers. It includes various panels and webviews that offer functionalities like JSON to YAML conversion, Base64 encoding, UUID generation, and more.

## How it is laid out
The project is organized into several directories, each serving a specific purpose:
- `src/`: Contains the main source code for the extension.
- `webview/`: Houses the webview components that are rendered in the VS Code editor.
- `scripts/`: Includes scripts for building and other tasks.

## Key modules
| Module Name | Path | Commits | Bug Fixes |
|-------------|------|---------|-----------|
| ToolPanel   | src/common/ToolPanel.ts | 13 | 3 |
| extension   | src/extension.ts | 13 | 1 |
| explorerNodeManager | src/explorer/explorerNodeManager.ts | 10 | 0 |
| showTool    | src/commands/showTool.ts | 9 | 1 |
| JsonToYaml  | src/Panel/JsonToYaml.ts | 8 | 0 |
| Base64      | src/Panel/Base64.ts | 6 | 1 |
| NumberBase  | src/Panel/NumberBase.ts | 6 | 1 |
| UUID        | src/Panel/UUID.ts | 5 | 1 |
| Html        | src/Panel/Html.ts | 4 | 0 |
| Url         | src/Panel/Url.ts | 4 | 0 |
| ColorBlindnessSimulator | src/Panel/ColorBlindnessSimulator.ts | 3 | 0 |
| Hash        | src/Panel/Hash.ts | 3 | 0 |
| Jwt         | src/Panel/Jwt.ts | 3 | 0 |
| RegexTester | src/Panel/RegexTester.ts | 3 | 0 |
| Timestamp   | src/Panel/Timestamp.ts | 3 | 1 |

## Public API surface
The public API includes the `extension.ts` file, which is the entry point for the extension. It also includes various panel components like `JsonToYaml.ts`, `Base64.ts`, etc., which can be used to extend the functionality of the extension.

## Hotspots and gotchas
The modules with the highest churn and bug-fix commits are:
- `ToolPanel` (13 commits, 3 bug fixes)
- `extension` (13 commits, 1 bug fix)
- `JsonToYaml` (8 commits, 0 bug fixes)
- `Base64` (6 commits, 1 bug fix)
- `NumberBase` (6 commits, 1 bug fix)
- `UUID` (5 commits, 1 bug fix)
- `Timestamp` (3 commits, 1 bug fix)

These areas are where the codebase has been most actively developed and where potential issues may arise. New contributors should be aware of these areas and be prepared to handle potential bugs and edge cases.