# util.isToken

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\util.ts` (lines 194-210)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function isToken(jwt: string, checkTypClaim = false) {
  const decoded = decode(jwt);

  if (decoded.errors) {
    return false;
  }

  if (checkTypClaim && decoded.header.typ !== "JWT") {
    return false;
  }

  const split = jwt.split(".");
  let valid = true;
  split.forEach((s) => (valid = valid && isValidBase64String(s, true)));

  return valid;
}
```

## Docstring

_No docstring provided._

## Source

```
export function isToken(jwt: string, checkTypClaim = false) {
  const decoded = decode(jwt);

  if (decoded.errors) {
    return false;
  }

  if (checkTypClaim && decoded.header.typ !== "JWT") {
    return false;
  }

  const split = jwt.split(".");
  let valid = true;
  split.forEach((s) => (valid = valid && isValidBase64String(s, true)));

  return valid;
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
