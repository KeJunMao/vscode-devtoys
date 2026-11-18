# MatchBox.highlightHtml

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\RegexTester\components\MatchBox.tsx` (lines 59-91)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(matches: RegExpMatchArray[]) => {
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
      lastPart = text.substr(endPos);
      //string matched
      const matchStr = text.substr(startPos, match[0].length);
      const encodedMatchStr = applyHighlights(matchStr);
      // html encoded parts
      const encodedBeginPart = htmlEncode(beginPart);
      // text from begining to match string (including)
      const textTillStr = encodedBeginPart + encodedMatchStr;
      markedText += textTillStr;
      // Add lastIndex the length of begin part + matchStr
      lastEndPos = endPos;
    }
    // add the final unmatched lastPart
    markedText += htmlEncode(lastPart);
    if (highlight?.current) {
      highlight.current.innerHTML = markedText;
    }
    setTimeout(() => {
      resizeTextarea();
    }, 50);
  }
```

## Docstring

_No docstring provided._

## Source

```
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
      lastPart = text.substr(endPos);
      //string matched
      const matchStr = text.substr(startPos, match[0].length);
      const encodedMatchStr = applyHighlights(matchStr);
      // html encoded parts
      const encodedBeginPart = htmlEncode(beginPart);
      // text from begining to match string (including)
      const textTillStr = encodedBeginPart + encodedMatchStr;
      markedText += textTillStr;
      // Add lastIndex the length of begin part + matchStr
      lastEndPos = endPos;
    }
    // add the final unmatched lastPart
    markedText += htmlEncode(lastPart);
    if (highlight?.current) {
      highlight.current.innerHTML = markedText;
    }
    setTimeout(() => {
      resizeTextarea();
    }, 50);
  };
```

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
