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
