# Module: shared

**File:** `\src\shared.ts`

## Overview

Module `shared` contains 0 analyzed entities.

```
import { ThemeIcon, Uri } from "vscode";

export enum PanelType {
  null = 0,
  jsonToYaml = "jsonToYaml",
  numberBase = "numberBase",
  base64 = "base64",
  uuid = "uuid",
  html = "html",
  url = "url",
  hash = "hash",
  regexTester = "regexTester",
  colorBlindnessSimulator = "colorBlindnessSimulator",
  jwt = "jwt",
  qrcode = "qrcode",
  timestamp = "timestamp",
  cron = "cron",
  userAgent = "userAgent",
  curlToCode = "curlToCode",
}

export enum Category {
  all = "rootAll",
  coders = "rootCoders",
  convertors = "rootConvertors",
  generators = "rootGenerators",
  text = "rootText",
  graphic = "rootGraphic",
  others = "rootOthers",
}

export interface IToolData {
  label: string;
  tooltip: string;
  panel: PanelType | Category;
  iconPath?:
    | string
    | Uri
    | { light: string | Uri; dark: string | Uri }
    | ThemeIcon;
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 8
- Authors: 3
- Bug fixes: 0
- Features: 7

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
