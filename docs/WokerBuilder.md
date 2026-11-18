# Module: WokerBuilder

**File:** `\webview\components\react\RegexTester\woker\WokerBuilder.ts`

## Overview

Module `WokerBuilder` contains 0 analyzed entities.

```
export default class {
  constructor(worker: () => void) {
    const code = worker.toString();
    const blob = new Blob([`(${code})()`], { type: "application/javascript" });
    return new Worker(URL.createObjectURL(blob));
  }
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
