# Module: CodeBox

**File:** `\webview\components\react\RegexTester\components\CodeBox.tsx`

## Overview

Module `CodeBox` contains 3 analyzed entities.

```
import React, { useEffect, useRef, useState } from "react";
import RegexColorize from "regex-colorize";
import "regex-colorize/themes/sweetest.css";
import "./CodeBox.css";
import {
  VSCodeProgressRing,
  VSCodeCheckbox,
} from "@vscode/webview-ui-toolkit/react/index";
import { useTranslation } from "react-i18next";

let rgx = new RegexColorize();
rgx.colorizeAll();

export default ({
  regex,
  onInput,
}: {
  regex: RegExp | undefined;
  onInput: (value: RegExp | undefined) => void;
}) => {
  const { t } = useTranslation();

  const [debounceTimer, setDebounceTimer] = useState<number | undefined>(
    undefined
  );
  const [changeTimer, setChangeTimer] = useState<number | undefined>(undefined);
  const [regexError, setRegexError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [flag, setFlag] = useState<string[]>(["g", "m"]);
  const codebox = useRef<HTMLDivElement>(null);

  const handleFlagChange = (f: string, target: any) => {
    if (target.checked) {
      if (!flag.includes(f)) {
        setFlag([...flag, f]);
      }
    } else {
      setFlag(flag.filter((v) => v !== f));
    }
  };
  const handleKeyUp = (event?: React.KeyboardEvent<HTMLDivElement>) => {
    setLoading(true);
    clearTimeout(debounceTimer);
    setDebounceTimer(
      setTimeout(() => {
        let isValid = true;
        let reg;
        try {
          /// @ts-ignore
          reg = new RegExp(codebox.current.textContent, flag.join(""));
          setRegexError(false);
        } catch (e) {
          isValid = false;
          setRegexError(true);
        }
        if (changeTimer) {
          clearTimeout(changeTimer);
        }
        setChangeTimer(
          setTimeout(() => {
            rgx.colorizeAll();
          }, 3000)
        );
        if (isValid) {
          onInput(reg);
        }
        setLoading(false);
      }, 700)
    );
  };
  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventD
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `CodeBox.handleFlagChange` | function | No description |
| `CodeBox.handleKeyUp` | function | No description |
| `CodeBox.handlePaste` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
