# public-key-download.getKeyFromX5c

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\public-key-download.ts` (lines 27-34)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function getKeyFromX5c(x5c: string[]) {
  if (!Array.isArray(x5c) || typeof x5c[0] !== "string") {
    throw new Error("x5c claim not present or invalid");
  }

  const newlined = (x5c[0].match(/.{1,64}/g) || []).join("\n");
  return `-----BEGIN CERTIFICATE-----\n${newlined}\n-----END CERTIFICATE-----`;
}
```

## Docstring

_No docstring provided._

## Source

```
function getKeyFromX5c(x5c: string[]) {
  if (!Array.isArray(x5c) || typeof x5c[0] !== "string") {
    throw new Error("x5c claim not present or invalid");
  }

  const newlined = (x5c[0].match(/.{1,64}/g) || []).join("\n");
  return `-----BEGIN CERTIFICATE-----\n${newlined}\n-----END CERTIFICATE-----`;
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
