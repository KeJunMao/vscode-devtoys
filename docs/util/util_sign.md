# util.sign

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\util.ts` (lines 54-78)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function sign(
  header: jose.JWEHeaderParameters,
  payload: jose.JWTPayload | string,
  secretOrPrivateKeyString: string,
  base64Secret = false
) {
  if (!header.alg) {
    return Promise.reject(new Error('Missing "alg" claim in header'));
  }

  return getJoseKey(
    header,
    secretOrPrivateKeyString,
    base64Secret,
    Type.PRIVATE
  ).then((key) => {
    if (!(typeof payload === "string" || payload instanceof String)) {
      payload = JSON.stringify(payload);
    }

    return new jose.CompactSign(new TextEncoder().encode(payload as string))
      .setProtectedHeader(header as jose.CompactJWSHeaderParameters)
      .sign(key);
  });
}
```

## Docstring

_No docstring provided._

## Source

```
export function sign(
  header: jose.JWEHeaderParameters,
  payload: jose.JWTPayload | string,
  secretOrPrivateKeyString: string,
  base64Secret = false
) {
  if (!header.alg) {
    return Promise.reject(new Error('Missing "alg" claim in header'));
  }

  return getJoseKey(
    header,
    secretOrPrivateKeyString,
    base64Secret,
    Type.PRIVATE
  ).then((key) => {
    if (!(typeof payload === "string" || payload instanceof String)) {
      payload = JSON.stringify(payload);
    }

    return new jose.CompactSign(new TextEncoder().encode(payload as string))
      .setProtectedHeader(header as jose.CompactJWSHeaderParameters)
      .sign(key);
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
