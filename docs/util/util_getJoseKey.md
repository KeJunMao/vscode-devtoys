# util.getJoseKey

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\util.ts` (lines 212-260)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function getJoseKey(
  header: jose.JWEHeaderParameters,
  key: string,
  base64Secret: boolean,
  type: Type
): Promise<any> {
  if (header?.alg?.indexOf("HS") === 0) {
    return symmetricSecret(key, header.alg, base64Secret);
  }

  switch (type) {
    case Type.PRIVATE:
      if (key.startsWith("-----BEGIN RSA PRIVATE KEY-----")) {
        key = pki.privateKeyInfoToPem(
          pki.wrapRsaPrivateKey(
            pki.privateKeyToAsn1(pki.privateKeyFromPem(key))
          )
        );
      }
      return Promise.any([
        jose.importPKCS8(key, header.alg ?? ""),
        Promise.resolve()
          .then(() => JSON.parse(key))
          .then(rawPrivate)
          .then((jwk) => {
            if (!("d" in jwk)) {
              throw new Error("not a private JWK");
            }
            return jose.importJWK(jwk, header.alg);
          }),
      ]);
    case Type.PUBLIC:
      if (key.startsWith("-----BEGIN RSA PUBLIC KEY-----")) {
        key = pki.publicKeyToPem(pki.publicKeyFromPem(key));
      }
      return Promise.any([
        jose.importSPKI(key, header.alg ?? ""),
        jose.importX509(key, header.alg ?? ""),
        Promise.resolve()
          .then(() => JSON.parse(key))
          .then(rawPublic)
          .then((jwk) => {
            return jose.importJWK(jwk, header.alg);
          }),
      ]);
    default:
      throw new Error("unreachable");
  }
}
```

## Docstring

_No docstring provided._

## Source

```
function getJoseKey(
  header: jose.JWEHeaderParameters,
  key: string,
  base64Secret: boolean,
  type: Type
): Promise<any> {
  if (header?.alg?.indexOf("HS") === 0) {
    return symmetricSecret(key, header.alg, base64Secret);
  }

  switch (type) {
    case Type.PRIVATE:
      if (key.startsWith("-----BEGIN RSA PRIVATE KEY-----")) {
        key = pki.privateKeyInfoToPem(
          pki.wrapRsaPrivateKey(
            pki.privateKeyToAsn1(pki.privateKeyFromPem(key))
          )
        );
      }
      return Promise.any([
        jose.importPKCS8(key, header.alg ?? ""),
        Promise.resolve()
          .then(() => JSON.parse(key))
          .then(rawPrivate)
          .then((jwk) => {
            if (!("d" in jwk)) {
              throw new Error("not a private JWK");
            }
            return jose.importJWK(jwk, header.alg);
          }),
      ]);
    case Type.PUBLIC:
      if (key.startsWith("-----BEGIN RSA PUBLIC KEY-----")) {
        key = pki.publicKeyToPem(pki.publicKeyFromPem(key));
      }
      return Promise.any([
        jose.importSPKI(key, header.alg ?? ""),
        jose.importX509(key, header.alg ?? ""),
        Promise.resolve()
          .then(() => JSON.parse(key))
          .then(rawPublic)
          .then((jwk) => {
            return jose.importJWK(jwk, header.alg);
          }),
      ]);
    default:
      throw new Error("unreachable");
  }
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
