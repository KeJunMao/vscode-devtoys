# util.utf8_to_b64

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\util.ts` (lines 5-7)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function utf8_to_b64(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
```

## Docstring

_No docstring provided._

## Source

```
function utf8_to_b64(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
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
