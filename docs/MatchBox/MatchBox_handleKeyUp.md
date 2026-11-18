# MatchBox.handleKeyUp

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\RegexTester\components\MatchBox.tsx` (lines 24-32)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
    resizeTextarea();
    if (typeTimeout) {
      clearTimeout(typeTimeout);
    }
    typeTimeout = setTimeout(() => {
      boxEdited();
    }, 50);
  }
```

## Docstring

_No docstring provided._

## Source

```
  const handleKeyUp = () => {
    resizeTextarea();
    if (typeTimeout) {
      clearTimeout(typeTimeout);
    }
    typeTimeout = setTimeout(() => {
      boxEdited();
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
