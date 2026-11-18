# MatchBox.htmlEncode

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\RegexTester\components\MatchBox.tsx` (lines 52-58)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function htmlEncode(text: string) {
    return text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
```

## Docstring

_No docstring provided._

## Source

```
  function htmlEncode(text: string) {
    return text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
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
