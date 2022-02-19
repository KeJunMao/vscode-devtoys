<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import { Algorithm } from "./shared";
import {
  vsCodeTextArea,
  vsCodeCheckbox,
  vsCodeDropdown,
  vsCodeOption,
  vsCodeTextField,
  provideVSCodeDesignSystem,
} from "@vscode/webview-ui-toolkit";
import { defaultTokens } from "./defaultTokens";
import { decode, sign, verify } from "./util";
provideVSCodeDesignSystem().register(
  vsCodeTextArea(),
  vsCodeCheckbox(),
  vsCodeDropdown(),
  vsCodeOption(),
  vsCodeTextField()
);

const tokenText = ref("");
const tokenInput = ref();
const algorithm: Ref<Algorithm> = ref(Algorithm.hs256);
const headerText = ref("");
const headerInput = ref();
const payloadText = ref("");
const payloadInput = ref();
const secretText = ref("");
const secretInput = ref();
const publicKeyText = ref("");
const publictKeyInput = ref();
const privateKeyText = ref("");
const privateKeyInput = ref();
const warnings = ref<string[]>([]);

async function handleAlgorithmChange(value: string) {
  useDefaultToken(value as Algorithm);
}

function isSharedSecretAlgorithm(algorithm: Algorithm) {
  algorithm = algorithm.toLowerCase() as Algorithm;
  return algorithm && algorithm.indexOf("hs") === 0;
}

function useDefaultToken(algorithm: Algorithm) {
  const defaults = defaultTokens[algorithm];
  const decoded = decode(defaults.token);
  warnings.value = decoded.warnings;
  tokenText.value = defaults.token;
  headerText.value = JSON.stringify(decoded.header, null, 2);
  payloadText.value = JSON.stringify(decoded.payload, null, 2);
  if (isSharedSecretAlgorithm(algorithm)) {
    secretText.value = defaults.secret || "";
  } else {
    publicKeyText.value = defaults.publicKey || "";
    privateKeyText.value = defaults.privateKey || "";
  }
}

function verifyToken() {
  const jwt = tokenText.value;
  const decoded = decode(jwt);
  warnings.value = decoded.warnings;

  if (!decoded.header.alg || decoded.header.alg === "none") {
    headerInput.value.control.style.background =
      "var(--vscode-inputValidation-errorBackground)";
    console.log("Invalid header");
    return;
  }

  const publicKeyOrSecret = isSharedSecretAlgorithm(
    decoded.header.alg.toLowerCase() as Algorithm
  )
    ? secretText.value
    : publicKeyText.value;
  verify(jwt, publicKeyOrSecret, false).then((result) => {
    if (result.validSignature) {
      if (!result.validBase64) {
        tokenInput.value.control.style.background =
          "var(--vscode-inputValidation-errorBackground)";
        console.log("Invalid");
      } else {
        tokenInput.value.control.style.background = "";
        console.log("Valid");
      }
    } else {
      tokenInput.value.control.style.background =
        "var(--vscode-inputValidation-errorBackground)";
      console.log("Invalid signature");
    }
  });
}

function encodeToken() {
  resetEditorWarnings();
  let header;
  try {
    header = JSON.parse(headerText.value);
  } catch (e) {
    headerInput.value.control.style.background =
      "var(--vscode-inputValidation-errorBackground)";
    console.log("Invalid header");
    return;
  }

  if (!header.alg) {
    setAlgorithmInHeader(algorithm.value);
    console.log("No algorithm specified");
    return;
  } else {
    algorithm.value = header.alg.toLowerCase();
  }

  let payload;
  try {
    payload = JSON.parse(payloadText.value);
  } catch (e) {
    payloadInput.value.control.style.background =
      "var(--vscode-inputValidation-errorBackground)";
    console.log("Invalid payload");
    return;
  }

  const key = isSharedSecretAlgorithm(header.alg.toLowerCase())
    ? secretText.value
    : privateKeyText.value;

  sign(header, payload, key, false)
    .then((encoded) => {
      tokenText.value = encoded;
    })
    .catch((e) => {
      tokenInput.value.control.style.background =
        "var(--vscode-inputValidation-errorBackground)";
      tokenText.value = "";
      console.log("Failed to sign/encode token: ", e);
    })
    .finally(() => {
      verifyToken();
    });
}
function decodeToken() {
  resetEditorWarnings();
  try {
    const jwt = tokenText.value;
    const decoded = decode(jwt);
    warnings.value = decoded.warnings;
    algorithm.value = decoded.header.alg?.toLowerCase() as Algorithm;

    if (isPublicKeyAlgorithm(decoded.header.alg)) {
      // downloadPublicKeyIfPossible(decoded).then((publicKey) => {
      //   publicKeyText.value = publicKey;
      //   verifyToken();
      // });
    }

    headerText.value = JSON.stringify(decoded.header, null, 2);
    payloadText.value = JSON.stringify(decoded.payload, null, 2);

    if (decoded.errors) {
      console.log("Invalid token: ", decoded.errors);
      if (decoded.warnings.includes("payloadInvalidJSON")) {
        payloadInput.value.control.style.background =
          "var(--vscode-inputValidation-errorBackground)";
      }
    } else {
      if (decoded.warnings && decoded.warnings.length > 0) {
        warnings.value = decoded.warnings;
        tokenInput.value.control.style.background =
          "var(--vscode-inputValidation-warningBackground)";
      } else {
        warnings.value = [];
      }

      verifyToken();
    }
  } catch (e) {
    console.log("Failed to decode token: ", e);
  }
}
function resetEditorWarnings() {
  tokenInput.value.control.style.background = "";
  headerInput.value.control.style.background = "";
  payloadInput.value.control.style.background = "";
}

function isPublicKeyAlgorithm(algorithm: string | undefined) {
  return algorithm && algorithm.indexOf("HS") === -1;
}

function setAlgorithmInHeader(value: Algorithm) {
  try {
    const header = JSON.parse(headerText.value);
    header.alg = value.toUpperCase();
    headerText.value = JSON.stringify(header, null, 2);
  } catch (e) {
    if (!(e instanceof SyntaxError)) {
      console.warn("Failed to encode token: ", e);
    }
  }

  try {
    encodeToken();
  } catch (e) {}
}

onMounted(() => {
  useDefaultToken(algorithm.value);
});
</script>

<template>
  <h1>JWT Encoder/Decoder</h1>
  <div class="algorithm-dropdown">
    Algorithm:&nbsp;
    <vscode-dropdown
      :value="algorithm"
      @change="
        ({ target }) => {
          algorithm = target.value;
          handleAlgorithmChange(algorithm);
        }
      "
    >
      <vscode-option v-for="(_, key) in defaultTokens" :key="key" :value="key">
        {{ String(key).toUpperCase() }}
      </vscode-option>
    </vscode-dropdown>
  </div>
  <div class="editor">
    <div class="editor-encoded">
      <vscode-text-area
        style="width: 100%"
        :value="tokenText"
        ref="tokenInput"
        @input="
          ({ target }) => {
            tokenText = target.value;
            decodeToken();
          }
        "
        cols="30"
        rows="24"
        >Encoded</vscode-text-area
      >
    </div>
    <div class="editor-decoded">
      <vscode-text-area
        style="width: 100%"
        :value="headerText"
        ref="headerInput"
        @input="
          ({ target }) => {
            headerText = target.value;
            encodeToken();
          }
        "
        cols="30"
        rows="5"
        >Header</vscode-text-area
      >
      <vscode-text-area
        style="width: 100%"
        :value="payloadText"
        ref="payloadInput"
        @input="
          ({ target }) => {
            payloadText = target.value;
            encodeToken();
          }
        "
        cols="30"
        rows="7"
        >Payload</vscode-text-area
      >
      <vscode-text-field
        style="width: 100%"
        v-if="isSharedSecretAlgorithm(algorithm)"
        ref="secretInput"
        :value="secretText"
        @input="
          ({ target }) => {
            secretText = target.value;
            encodeToken();
          }
        "
      >
        Secret
      </vscode-text-field>

      <div v-else>
        <vscode-text-area
          style="width: 100%"
          ref="publicKeyInput"
          :value="publicKeyText"
          @input="
            ({ target }) => {
              publicKeyText = target.value;
              encodeToken();
            }
          "
          >PublicKey</vscode-text-area
        >
        <vscode-text-area
          style="width: 100%"
          ref="privateKeyInput"
          :value="privateKeyText"
          @input="
            ({ target }) => {
              privateKeyText = target.value;
              encodeToken();
            }
          "
          >PrivateKey</vscode-text-area
        >
      </div>
    </div>
  </div>
  <p v-for="warn in warnings">{{ warn }}</p>
</template>
<style>
.algorithm-dropdown {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
}

.editor {
  display: flex;
}
.editor-encoded {
  margin-right: 5px;
  flex: 1;
}
.editor-decoded {
  margin-left: 5px;
  flex: 1;
}
</style>
