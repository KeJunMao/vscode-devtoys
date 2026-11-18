# CodeBox.handlePaste

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\RegexTester\components\CodeBox.tsx` (lines 71-77)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    setTimeout(() => {
      document.execCommand("insertHTML", false, text);
    }, 0);
  }
```

## Docstring

_No docstring provided._

## Source

```
  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    setTimeout(() => {
      document.execCommand("insertHTML", false, text);
    }, 0);
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
