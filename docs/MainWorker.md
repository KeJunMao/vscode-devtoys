# Module: MainWorker

**File:** `\webview\components\react\RegexTester\woker\MainWorker.ts`

## Overview

Module `MainWorker` contains 0 analyzed entities.

```
export default () => {
  self.onmessage = (message) => {
    const {
      regex,
      text,
    }: {
      regex: RegExp;
      text: string;
    } = message.data;
    let matches;
    if (regex.flags.includes("g")) {
      matches = [...text.matchAll(regex)];
    } else {
      // if matches? add to array else empty []
      matches = text.match(regex) ? [text.match(regex)] : [];
    }
    postMessage(matches);
  };
};
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
