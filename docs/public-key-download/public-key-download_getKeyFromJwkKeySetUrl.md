# public-key-download.getKeyFromJwkKeySetUrl

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\public-key-download.ts` (lines 49-57)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function getKeyFromJwkKeySetUrl(header: jose.JWSHeaderParameters, url: string) {
  return (
    jose
      // @ts-ignore
      .createRemoteJWKSet(new URL(url))(header, {})
      .then(jose.exportJWK)
      .then((jwk) => JSON.stringify(jwk, null, 2))
  );
}
```

## Docstring

_No docstring provided._

## Source

```
function getKeyFromJwkKeySetUrl(header: jose.JWSHeaderParameters, url: string) {
  return (
    jose
      // @ts-ignore
      .createRemoteJWKSet(new URL(url))(header, {})
      .then(jose.exportJWK)
      .then((jwk) => JSON.stringify(jwk, null, 2))
  );
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
