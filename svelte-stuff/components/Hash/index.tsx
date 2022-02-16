import { useTranslation } from "react-i18next";
import {
  VSCodeTextArea,
  VSCodeTextField,
  VSCodeDropdown,
  VSCodeOption,
} from "@vscode/webview-ui-toolkit/react";
import React from "react";
import CryptoJS from "crypto-js";

export default () => {
  const { t } = useTranslation();
  /* eslint-disable */
  const encryptionList = {
    MD5: "MD5",
    HmacMD5: "HmacMD5",
    SHA1: "SHA-1",
    HmacSHA1: "HmacSHA-1",
    SHA256: "SHA-2",
    HmacSHA256: "HmacSHA-2",
    SHA3: "SHA-3",
    HmacSHA512: "HmacSHA-3",
    RIPEMD160: "RIPEMD-160",
    AES: "AES",
    DES: "DES",
    TripleDES: "TripleDES",
    Rabbit: "Rabbit",
    RC4: "RC4",
    RC4Drop: "RC4Drop",
  };
  const ciphersList = {
    AES: "AES",
    DES: "DES",
    TripleDES: "TripleDES",
    Rabbit: "Rabbit",
    RC4: "RC4",
    RC4Drop: "RC4Drop",
  };
  const HMACList = ["HmacMD5", "HmacSHA1", "HmacSHA256", "HmacSHA512"];

  const [encryption, setEncryption] = React.useState("MD5");
  const [type, setType] = React.useState("encrypt");
  const [content, setContent] = React.useState("");
  const [key, setKey] = React.useState("");
  const [drop, setDrop] = React.useState(192);
  const [result, setResult] = React.useState("");
  const [onUpdate, setOnUpdate] = React.useState(false);
  const methods = {
    MD5() {
      return CryptoJS.MD5(content).toString();
    },
    HmacMD5() {
      return CryptoJS.HmacMD5(content, key).toString();
    },
    SHA1() {
      return CryptoJS.SHA1(content).toString();
    },
    HmacSHA1() {
      return CryptoJS.HmacSHA1(content, key).toString();
    },
    SHA256() {
      return CryptoJS.SHA256(content).toString();
    },
    HmacSHA256() {
      return CryptoJS.HmacSHA256(content, key).toString();
    },
    SHA3() {
      return CryptoJS.SHA3(content).toString();
    },
    HmacSHA512() {
      return CryptoJS.HmacSHA512(content, key).toString();
    },
    RIPEMD160() {
      return CryptoJS.RIPEMD160(content).toString();
    },
    AES() {
      try {
        /// @ts-ignore
        return CryptoJS.AES[type](
          type === "encrypt" ? content : result,
          key
        ).toString(type === "encrypt" ? undefined : CryptoJS.enc.Utf8);
      } catch (error) {
        return false;
      }
    },
    DES() {
      try {
        /// @ts-ignore
        return CryptoJS.DES[type](
          type === "encrypt" ? content : result,
          key
        ).toString(type === "encrypt" ? undefined : CryptoJS.enc.Utf8);
      } catch (error) {
        return false;
      }
    },
    TripleDES() {
      try {
        /// @ts-ignore
        return CryptoJS.TripleDES[type](
          type === "encrypt" ? content : result,
          key
        ).toString(type === "encrypt" ? undefined : CryptoJS.enc.Utf8);
      } catch (error) {
        return false;
      }
    },
    Rabbit() {
      try {
        /// @ts-ignore
        return CryptoJS.Rabbit[type](
          type === "encrypt" ? content : result,
          key
        ).toString(type === "encrypt" ? undefined : CryptoJS.enc.Utf8);
      } catch (error) {
        return false;
      }
    },
    RC4() {
      try {
        /// @ts-ignore
        return CryptoJS.RC4[type](
          type === "encrypt" ? content : result,
          key
        ).toString(type === "encrypt" ? undefined : CryptoJS.enc.Utf8);
      } catch (error) {
        return false;
      }
    },
    RC4Drop() {
      try {
        /// @ts-ignore
        return CryptoJS.RC4Drop[type](content, key, {
          drop: drop,
        }).toString(type === "encrypt" ? undefined : CryptoJS.enc.Utf8);
      } catch (error) {
        return false;
      }
    },
  };
  /* eslint-enable */
  const encrypt = () => {
    /// @ts-ignore
    setResult(methods[encryption]());
  };
  const decrypt = () => {
    /// @ts-ignore
    setContent(methods[encryption]());
  };

  React.useEffect(() => {
    if (type === "encrypt") {
      encrypt();
    } else {
      decrypt();
    }
  }, [onUpdate]);
  return (
    <div>
      <h1>{t("tool.hash.title")}</h1>
      <label
        style={{
          display: "block",
          color: "var(--foreground)",
          cursor: "pointer",
          fontSize: "var(--type-ramp-base-font-size)",
          lineHeight: "var(--type-ramp-base-line-height)",
          marginBottom: "calc(var(--design-unit) * 1px)",
        }}
      >
        {t("tool.hash.hashTypeDropdown.label")}
      </label>
      <VSCodeDropdown
        style={{ width: "100%" }}
        onChange={({ target }) => {
          const { value } = target as HTMLSelectElement;
          setEncryption(value);
          setContent("");
          setResult("");
          setKey("");
          setType("encrypt");
          setOnUpdate(!onUpdate);
        }}
      >
        {Object.entries(encryptionList).map(([key, value]) => {
          return (
            <VSCodeOption key={key} value={key}>
              {value}
            </VSCodeOption>
          );
        })}
      </VSCodeDropdown>
      <VSCodeTextArea
        style={{ width: "100%" }}
        value={content}
        onInput={({ target }) => {
          const { value } = target as HTMLInputElement;
          setContent(value);
          setType("encrypt");
          setOnUpdate(!onUpdate);
        }}
      >
        {t("tool.hash.sourceTextArea.label")}
      </VSCodeTextArea>
      {
        //@ts-ignore
        Object.keys(ciphersList).includes(encryption) ||
        HMACList.includes(encryption) ? (
          <VSCodeTextField
            style={{ width: "100%" }}
            value={key}
            onInput={({ target }) => {
              const { value } = target as HTMLInputElement;
              setKey(value);
              setOnUpdate(!onUpdate);
            }}
          >
            {HMACList.includes(encryption)
              ? t("tool.hash.saltInput.label")
              : t("tool.hash.keyInput.label")}
          </VSCodeTextField>
        ) : null
      }
      {encryption === "RC4Drop" && (
        <VSCodeTextField
          placeholder={t("tool.hash.dropInput.placeholder")}
          style={{ width: "100%" }}
          value={drop.toString()}
          onInput={({ target }) => {
            const { value } = target as HTMLInputElement;
            setDrop(Number(value));
            setOnUpdate(!onUpdate);
          }}
        >
          {t("tool.hash.dropInput.label")}
        </VSCodeTextField>
      )}
      <VSCodeTextArea
        style={{ width: "100%" }}
        value={result}
        readOnly={!Object.keys(ciphersList).includes(encryption)}
        onInput={({ target }) => {
          const { value } = target as HTMLInputElement;
          setResult(value);
          setType("decrypt");
          setOnUpdate(!onUpdate);
        }}
      >
        {t("tool.hash.resultTextArea.label")}
      </VSCodeTextArea>
    </div>
  );
};
