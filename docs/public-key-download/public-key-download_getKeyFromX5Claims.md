# public-key-download.getKeyFromX5Claims

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\public-key-download.ts` (lines 36-47)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function getKeyFromX5Claims(claims: any) {
  return new Promise((resolve, reject) => {
    if (claims.x5c) {
      resolve(getKeyFromX5c(claims.x5c));
    } else if (claims.x5u) {
      //@ts-ignore
      resolve(httpGet(claims.x5u).then(getKeyFromX5c));
    } else {
      reject("x5c or x5u claims not available");
    }
  });
}
```

## Docstring

_No docstring provided._

## Source

```
function getKeyFromX5Claims(claims: any) {
  return new Promise((resolve, reject) => {
    if (claims.x5c) {
      resolve(getKeyFromX5c(claims.x5c));
    } else if (claims.x5u) {
      //@ts-ignore
      resolve(httpGet(claims.x5u).then(getKeyFromX5c));
    } else {
      reject("x5c or x5u claims not available");
    }
  });
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
