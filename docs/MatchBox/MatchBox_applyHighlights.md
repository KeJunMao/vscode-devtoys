# MatchBox.applyHighlights

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\RegexTester\components\MatchBox.tsx` (lines 46-51)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function applyHighlights(text: string) {
    let fixedText = htmlEncode(text);
    fixedText = fixedText.replace(/\n$/g, "\n\n");
    fixedText = `<mark>${fixedText}</mark>`;
    return fixedText;
  }
```

## Docstring

_No docstring provided._

## Source

```
  function applyHighlights(text: string) {
    let fixedText = htmlEncode(text);
    fixedText = fixedText.replace(/\n$/g, "\n\n");
    fixedText = `<mark>${fixedText}</mark>`;
    return fixedText;
  }
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
