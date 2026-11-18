# Module: explorerNodeManager

**File:** `\src\explorer\explorerNodeManager.ts`

## Overview

Module `explorerNodeManager` contains 1 analyzed entities.

```
import { Disposable, ThemeIcon } from "vscode";
import i18n from "../i18n";
import { Category, IToolData, PanelType } from "../shared";
import { DevToysNode } from "./DevToysNode";

class ExplorerNodeManager implements Disposable {
  private explorerNodeMap: Map<Category, DevToysNode[]> = new Map<
    Category,
    DevToysNode[]
  >();

  initialize(): void {
    const coders: IToolData[] = [
      {
        label: i18n.t("view.devtoys.coders.base64.label"),
        tooltip: i18n.t("view.devtoys.coders.base64.tooltip"),
        panel: PanelType.base64,
      },
      {
        label: i18n.t("view.devtoys.coders.html.label"),
        tooltip: i18n.t("view.devtoys.coders.html.tooltip"),
        panel: PanelType.html,
      },
      {
        label: i18n.t("view.devtoys.coders.url.label"),
        tooltip: i18n.t("view.devtoys.coders.url.tooltip"),
        panel: PanelType.url,
      },
      {
        label: i18n.t("view.devtoys.coders.jwt.label"),
        tooltip: i18n.t("view.devtoys.coders.jwt.tooltip"),
        panel: PanelType.jwt,
      },
    ];
    const convertors: IToolData[] = [
      {
        label: i18n.t("view.devtoys.convertors.jsonToYaml.label"),
        tooltip: i18n.t("view.devtoys.convertors.jsonToYaml.tooltip"),
        panel: PanelType.jsonToYaml,
      },
      {
        label: i18n.t("view.devtoys.convertors.numberBase.label"),
        tooltip: i18n.t("view.devtoys.convertors.numberBase.tooltip"),
        panel: PanelType.numberBase,
      },
      {
        label: i18n.t("view.devtoys.convertors.timestamp.label"),
        tooltip: i18n.t("view.devtoys.convertors.timestamp.tooltip"),
        panel: PanelType.timestamp,
      },
      {
        label: i18n.t("view.devtoys.convertors.curlToCode.label"),
        tooltip: i18n.t("view.devtoys.convertors.curlToCode.tooltip"),
        panel: PanelType.curlToCode,
      },
    ];

    const generators: IToolData[] = [
      {
        label: i18n.t("view.devtoys.generators.uuid.label"),
        tooltip
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `explorerNodeManager.ExplorerNodeManager` | class | No description |

## Git History

- Commits: 10
- Authors: 3
- Bug fixes: 0
- Features: 9

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
