# public-key-download.downloadPublicKeyIfPossible

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\public-key-download.ts` (lines 59-98)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function downloadPublicKeyIfPossible(decodedToken: any) {
  return new Promise((resolve, reject) => {
    const header = decodedToken.header;
    const payload = decodedToken.payload;

    if (!header.alg || header.alg.indexOf("HS") === 0) {
      reject(`Unsupported alg: ${header.alg}`);
      return;
    }

    if (header.x5c || header.x5u) {
      getKeyFromX5Claims(header).then(resolve, reject);
    } else if (header.jku) {
      getKeyFromJwkKeySetUrl(header, header.jku).then(resolve, reject);
    } else if (header.jwk) {
      resolve(JSON.stringify(header.jwk, null, 2));
    } else if (payload.iss) {
      const url =
        payload.iss +
        (payload.iss.substr(-1) === "/"
          ? ".well-known/openid-configuration"
          : "/.well-known/openid-configuration");

      httpGet(url)
        .then((data) => {
          data = JSON.parse(data);

          // @ts-ignore
          if (!data || !data.jwks_uri || typeof data.jwks_uri !== "string") {
            throw new Error(`Could not get jwks_uri from URL: ${url}`);
          }
          // @ts-ignore
          return getKeyFromJwkKeySetUrl(header, data.jwks_uri).then(resolve);
        })
        .catch(reject);
    } else {
      reject("No details about key");
    }
  });
}
```

## Docstring

_No docstring provided._

## Source

```
export function downloadPublicKeyIfPossible(decodedToken: any) {
  return new Promise((resolve, reject) => {
    const header = decodedToken.header;
    const payload = decodedToken.payload;

    if (!header.alg || header.alg.indexOf("HS") === 0) {
      reject(`Unsupported alg: ${header.alg}`);
      return;
    }

    if (header.x5c || header.x5u) {
      getKeyFromX5Claims(header).then(resolve, reject);
    } else if (header.jku) {
      getKeyFromJwkKeySetUrl(header, header.jku).then(resolve, reject);
    } else if (header.jwk) {
      resolve(JSON.stringify(header.jwk, null, 2));
    } else if (payload.iss) {
      const url =
        payload.iss +
        (payload.iss.substr(-1) === "/"
          ? ".well-known/openid-configuration"
          : "/.well-known/openid-configuration");

      httpGet(url)
        .then((data) => {
          data = JSON.parse(data);

          // @ts-ignore
          if (!data || !data.jwks_uri || typeof data.jwks_uri !== "string") {
            throw new Error(`Could not get jwks_uri from URL: ${url}`);
          }
          // @ts-ignore
          return getKeyFromJwkKeySetUrl(header, data.jwks_uri).then(resolve);
        })
        .catch(reject);
    } else {
      reject("No details about key");
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
