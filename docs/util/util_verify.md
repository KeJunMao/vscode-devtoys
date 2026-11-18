# util.verify

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\util.ts` (lines 80-125)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function verify(
  jwt: string,
  secretOrPublicKeyString: string,
  base64Secret = false
): Promise<{
  validSignature: boolean;
  validBase64?: boolean | undefined | string;
}> {
  if (!isToken(jwt)) {
    return Promise.resolve({ validSignature: false });
  }

  const decoded = decode(jwt);

  if (!decoded.header.alg || decoded.errors) {
    return Promise.resolve({ validSignature: false });
  }

  return getJoseKey(
    decoded.header,
    secretOrPublicKeyString,
    base64Secret,
    Type.PUBLIC
  ).then(
    (key) => {
      return jose.compactVerify(jwt, key).then(
        () => ({
          validSignature: true,
          validBase64: jwt.split(".").reduce(
            /// @ts-ignore
            (valid, s) => (valid = valid && isValidBase64String(s)),
            true
          ),
        }),
        (e) => {
          console.warn("Could not verify token: ", e);
          return { validSignature: false };
        }
      );
    },
    (e) => {
      console.warn("Could not load the key(s): ", e);
      return { validSignature: false };
    }
  );
}
```

## Docstring

_No docstring provided._

## Source

```
export function verify(
  jwt: string,
  secretOrPublicKeyString: string,
  base64Secret = false
): Promise<{
  validSignature: boolean;
  validBase64?: boolean | undefined | string;
}> {
  if (!isToken(jwt)) {
    return Promise.resolve({ validSignature: false });
  }

  const decoded = decode(jwt);

  if (!decoded.header.alg || decoded.errors) {
    return Promise.resolve({ validSignature: false });
  }

  return getJoseKey(
    decoded.header,
    secretOrPublicKeyString,
    base64Secret,
    Type.PUBLIC
  ).then(
    (key) => {
      return jose.compactVerify(jwt, key).then(
        () => ({
          validSignature: true,
          validBase64: jwt.split(".").reduce(
            /// @ts-ignore
            (valid, s) => (valid = valid && isValidBase64String(s)),
            true
          ),
        }),
        (e) => {
          console.warn("Could not verify token: ", e);
          return { validSignature: false };
        }
      );
    },
    (e) => {
      console.warn("Could not load the key(s): ", e);
      return { validSignature: false };
    }
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
