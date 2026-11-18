# CodeBox.handleKeyUp

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\RegexTester\components\CodeBox.tsx` (lines 41-70)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(event?: React.KeyboardEvent<HTMLDivElement>) => {
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
  }
```

## Docstring

_No docstring provided._

## Source

```
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
