# util.b64_to_utf8

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\util.ts` (lines 10-12)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function b64_to_utf8(str: string) {
  return decodeURIComponent(escape(window.atob(str)));
}
```

## Docstring

_No docstring provided._

## Source

```
function b64_to_utf8(str: string) {
  return decodeURIComponent(escape(window.atob(str)));
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
