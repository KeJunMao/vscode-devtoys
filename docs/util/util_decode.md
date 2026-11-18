# util.decode

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\util.ts` (lines 127-176)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(jwt: string) => {
  const result: {
    header: jose.JWEHeaderParameters;
    payload: jose.JWTPayload | string;
    errors: boolean;
    warnings: any[];
  } = {
    header: {},
    payload: {},
    errors: false,
    warnings: [],
  };

  if (!jwt) {
    result.errors = true;
    return result;
  }

  const split = jwt.split(".");

  if (!isValidBase64String(split[2])) {
    result.warnings.push("signatureBase64Invalid");
  }

  try {
    if (!isValidBase64String(split[0])) {
      result.warnings.push("headerBase64Invalid");
    }
    result.header = JSON.parse(b64u.decode(split[0]));
  } catch (e) {
    console.error(e);
    result.errors = true;
  }

  try {
    if (!isValidBase64String(split[1])) {
      result.warnings.push("payloadBase64Invalid");
    }
    result.payload = b64u.decode(split[1]);
  } catch (e) {}

  try {
    if (!isValidJSON(b64u.decode(split[1]))) {
      result.warnings.push("payloadInvalidJSON");
    }
    result.payload = JSON.parse(b64u.decode(split[1]));
  } catch (e) {}

  return result;
}
```

## Docstring

_No docstring provided._

## Source

```
export const decode = (jwt: string) => {
  const result: {
    header: jose.JWEHeaderParameters;
    payload: jose.JWTPayload | string;
    errors: boolean;
    warnings: any[];
  } = {
    header: {},
    payload: {},
    errors: false,
    warnings: [],
  };

  if (!jwt) {
    result.errors = true;
    return result;
  }

  const split = jwt.split(".");

  if (!isValidBase64String(split[2])) {
    result.warnings.push("signatureBase64Invalid");
  }

  try {
    if (!isValidBase64String(split[0])) {
      result.warnings.push("headerBase64Invalid");
    }
    result.header = JSON.parse(b64u.decode(split[0]));
  } catch (e) {
    console.error(e);
    result.errors = true;
  }

  try {
    if (!isValidBase64String(split[1])) {
      result.warnings.push("payloadBase64Invalid");
    }
    result.payload = b64u.decode(split[1]);
  } catch (e) {}

  try {
    if (!isValidJSON(b64u.decode(split[1]))) {
      result.warnings.push("payloadInvalidJSON");
    }
    result.payload = JSON.parse(b64u.decode(split[1]));
  } catch (e) {}

  return result;
};
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
