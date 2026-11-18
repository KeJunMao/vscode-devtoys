# util.isValidBase64String

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\util.ts` (lines 177-183)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function isValidBase64String(s: string, allowPadding = false) {
  if (allowPadding) {
    return /^[a-zA-Z0-9_=-]*$/.test(s);
  }

  return /^[a-zA-Z0-9_-]*$/.test(s);
}
```

## Docstring

_No docstring provided._

## Source

```
function isValidBase64String(s: string, allowPadding = false) {
  if (allowPadding) {
    return /^[a-zA-Z0-9_=-]*$/.test(s);
  }

  return /^[a-zA-Z0-9_-]*$/.test(s);
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
