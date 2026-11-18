# CodeBox.handleFlagChange

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\RegexTester\components\CodeBox.tsx` (lines 32-40)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(f: string, target: any) => {
    if (target.checked) {
      if (!flag.includes(f)) {
        setFlag([...flag, f]);
      }
    } else {
      setFlag(flag.filter((v) => v !== f));
    }
  }
```

## Docstring

_No docstring provided._

## Source

```
  const handleFlagChange = (f: string, target: any) => {
    if (target.checked) {
      if (!flag.includes(f)) {
        setFlag([...flag, f]);
      }
    } else {
      setFlag(flag.filter((v) => v !== f));
    }
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
