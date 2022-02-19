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
function isValidBase64String(s: string, allowPadding = false) {
  if (allowPadding) {
    return /^[a-zA-Z0-9_=-]*$/.test(s);
  }

  return /^[a-zA-Z0-9_-]*$/.test(s);
}

function isValidJSON(payload: string) {
  try {
    JSON.parse(payload);
  } catch (e) {
    return false;
  }
  return true;
}

export function isToken(jwt: string, checkTypClaim = false) {
  const decoded = decode(jwt);

  if (decoded.errors) {
    return false;
  }

  if (checkTypClaim && decoded.header.typ !== "JWT") {
    return false;
  }

  const split = jwt.split(".");
  let valid = true;
  split.forEach((s) => (valid = valid && isValidBase64String(s, true)));

  return valid;
}

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
