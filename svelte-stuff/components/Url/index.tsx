import { useTranslation } from "react-i18next";
import { VSCodeTextArea } from "@vscode/webview-ui-toolkit/react";
import React from "react";
export default () => {
  const { t } = useTranslation();
  const [url, setUrl] = React.useState("");
  const [encodedUrl, setEncodedUrl] = React.useState("");
  return (
    <div>
      <h1>{t("tool.Url.title")}</h1>
      <VSCodeTextArea
        value={url}
        onInput={({ target }) => {
          const { value } = target as HTMLInputElement;
          setUrl(value);
          setEncodedUrl(encodeURIComponent(value));
        }}
        style={{ width: "100%" }}
      >
        {t("tool.Url.sourceTextArea.label")}
      </VSCodeTextArea>
      <VSCodeTextArea
        value={encodedUrl}
        onInput={({ target }) => {
          const { value } = target as HTMLInputElement;
          setEncodedUrl(value);
          setUrl(decodeURIComponent(value));
        }}
        style={{ width: "100%" }}
      >
        {t("tool.Url.resultTextArea.label")}
      </VSCodeTextArea>
    </div>
  );
};
