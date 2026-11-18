# Module: MatchBox

**File:** `\webview\components\react\RegexTester\components\MatchBox.tsx`

## Overview

Module `MatchBox` contains 7 analyzed entities.

```
import { VSCodeTextArea } from "@vscode/webview-ui-toolkit/react/index";
import { useEffect, useRef, useState } from "react";
import "./MatchBox.css";
import autosize from "autosize";
import { useTranslation } from "react-i18next";
import WokerBuilder from "../woker/WokerBuilder";
import MainWorker from "../woker/MainWorker";
let typeTimeout: number | undefined;

export default ({
  regex,
  text = "",
  onInput,
}: {
  regex: RegExp | undefined;
  text?: string;
  onInput: (value: string) => void;
}) => {
  let worker: Worker | undefined;
  const { t } = useTranslation();

  const textarea = useRef<HTMLTextAreaElement>(null);
  const highlight = useRef<HTMLDivElement>(null);
  const handleKeyUp = () => {
    resizeTextarea();
    if (typeTimeout) {
      clearTimeout(typeTimeout);
    }
    typeTimeout = setTimeout(() => {
      boxEdited();
    }, 50);
  };
  const resizeTextarea = () => {
    if (textarea.current) {
      /// @ts-ignore
      textarea.current.control.style.background = "transparent";
      /// @ts-ignore
      autosize(textarea.current.control);
    }
    /// @ts-ignore
  };
  function getMatchTextOnly() {
    return text;
  }

  function applyHighlights(text: string) {
    let fixedText = htmlEncode(text);
    fixedText = fixedText.replace(/\n$/g, "\n\n");
    fixedText = `<mark>${fixedText}</mark>`;
    return fixedText;
  }
  function htmlEncode(text: string) {
    return text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  const highlightHtml = (matches: RegExpMatchArray[]) => {
    let markedText = "";
    let lastEndPos = 0;
    let lastPart = "";
    for (let match of matches) {
      if (!match) {
        return;
      }
      const startPos = match.index || 0;
      const endPos = startPos + match[0].length;
      const lengthOfBeginPart = startPos - lastEndPos;
      const beginPart = text.substr(lastEndPos, lengthOfBeginPart);
      lastPart = text.substr(en
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `MatchBox.getMatchTextOnly` | function | No description |
| `MatchBox.applyHighlights` | function | No description |
| `MatchBox.htmlEncode` | function | No description |
| `MatchBox.handleKeyUp` | function | No description |
| `MatchBox.boxEdited` | function | No description |
| `MatchBox.resizeTextarea` | function | No description |
| `MatchBox.highlightHtml` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
