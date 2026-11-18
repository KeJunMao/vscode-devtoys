# util.isValidJSON

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\util.ts` (lines 185-192)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function isValidJSON(payload: string) {
  try {
    JSON.parse(payload);
  } catch (e) {
    return false;
  }
  return true;
}
```

## Docstring

_No docstring provided._

## Source

```
function isValidJSON(payload: string) {
  try {
    JSON.parse(payload);
  } catch (e) {
    return false;
  }
  return true;
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
