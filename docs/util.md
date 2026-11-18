# Module: util

**File:** `\webview\components\vue\Jwt\util.ts`

## Overview

Module `util` contains 12 analyzed entities.

```
import * as jose from "jose";
import { pki } from "./node-forge";
import { Buffer } from "buffer";
// eslint-disable-next-line @typescript-eslint/naming-convention
function utf8_to_b64(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function b64_to_utf8(str: string) {
  return decodeURIComponent(escape(window.atob(str)));
}

const b64u = {
  encode: utf8_to_b64,
  decode: b64_to_utf8,
};

const rawPublic = ({
  alg,
  oth,
  d,
  p,
  q,
  dp,
  dq,
  qi,
  use,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  key_ops,
  ext,
  ...jwk
}: {
  [key: string]: string;
}) => jwk;
const rawPrivate = ({
  alg,
  use,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  key_ops,
  ext,
  ...jwk
}: {
  [key: string]: string;
}) => jwk;

enum Type {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PRIVATE,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PUBLIC,
}

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

  const decoded = decode(jwt
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `util.utf8_to_b64` | function | No description |
| `util.b64_to_utf8` | function | No description |
| `util.isValidBase64String` | function | No description |
| `util.verify` | function | No description |
| `util.sign` | function | No description |
| `util.isValidJSON` | function | No description |
| `util.isToken` | function | No description |
| `util.getJoseKey` | function | No description |
| `util.symmetricSecret` | function | No description |
| `util.rawPublic` | function | No description |
| `util.rawPrivate` | function | No description |
| `util.decode` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
