# util.symmetricSecret

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\util.ts` (lines 261-274)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function symmetricSecret(
  key: string,
  alg: string,
  base64Secret: boolean
): Promise<Uint8Array> {
  let secret = base64Secret ? Buffer.from(key, "base64") : Buffer.from(key);

  const len = Math.max(parseInt(alg.substr(-3), 10) >> 3, secret.byteLength);

  const padded = new Uint8Array(len);
  padded.set(secret);

  return Promise.resolve(padded);
}
```

## Docstring

_No docstring provided._

## Source

```
function symmetricSecret(
  key: string,
  alg: string,
  base64Secret: boolean
): Promise<Uint8Array> {
  let secret = base64Secret ? Buffer.from(key, "base64") : Buffer.from(key);

  const len = Math.max(parseInt(alg.substr(-3), 10) >> 3, secret.byteLength);

  const padded = new Uint8Array(len);
  padded.set(secret);

  return Promise.resolve(padded);
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
