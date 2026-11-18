# MatchBox.resizeTextarea

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\RegexTester\components\MatchBox.tsx` (lines 33-41)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
    if (textarea.current) {
      /// @ts-ignore
      textarea.current.control.style.background = "transparent";
      /// @ts-ignore
      autosize(textarea.current.control);
    }
    /// @ts-ignore
  }
```

## Docstring

_No docstring provided._

## Source

```
  const resizeTextarea = () => {
    if (textarea.current) {
      /// @ts-ignore
      textarea.current.control.style.background = "transparent";
      /// @ts-ignore
      autosize(textarea.current.control);
    }
    /// @ts-ignore
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
