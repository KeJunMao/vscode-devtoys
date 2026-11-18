# Module: public-key-download

**File:** `\webview\components\vue\Jwt\public-key-download.ts`

## Overview

Module `public-key-download` contains 5 analyzed entities.

```
// from https://github.com/jsonwebtoken/jsonwebtoken.github.io/blob/543a005509/src/editor/public-key-download.js
import * as jose from "jose";
export function httpGet(url: string, cache = true): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject({
            status: request.status,
            response: request.responseText,
          });
        }
      }
    };

    request.open("GET", url);
    if (!cache) {
      request.setRequestHeader("Cache-Control", "no-cache");
    }
    request.send();
  });
}

function getKeyFromX5c(x5c: string[]) {
  if (!Array.isArray(x5c) || typeof x5c[0] !== "string") {
    throw new Error("x5c claim not present or invalid");
  }

  const newlined = (x5c[0].match(/.{1,64}/g) || []).join("\n");
  return `-----BEGIN CERTIFICATE-----\n${newlined}\n-----END CERTIFICATE-----`;
}

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

function getKeyFromJwkKeySetUrl(header: jose.JWSHeaderParameters, url: string) {
  return (
    jose
      // @ts-ignore
      .createRemoteJWKSet(new URL(url))(header, {})
      .then(jose.exportJWK)
      .then((jwk) => JSON.stringify(jwk, null, 2))
  );
}

export function downloadPublicKeyIfPossible(decodedToken: any) {
  return new Promise((resolve, reject) => {
    const header = decodedToken.header;
    const payload = decodedToken.payload;

    if (!header.alg || header.alg.indexOf("HS") === 0) {
      reject(`Unsupported alg: ${header.alg}`);
      return;
    }

    if 
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `public-key-download.httpGet` | function | No description |
| `public-key-download.downloadPublicKeyIfPossible` | function | No description |
| `public-key-download.getKeyFromX5c` | function | No description |
| `public-key-download.getKeyFromX5Claims` | function | No description |
| `public-key-download.getKeyFromJwkKeySetUrl` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
