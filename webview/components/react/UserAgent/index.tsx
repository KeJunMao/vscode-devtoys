import { useTranslation } from "react-i18next";
import {
  VSCodeTextField,
  VSCodeTextArea,
} from "@vscode/webview-ui-toolkit/react";
import UAParser from "ua-parser-js";
import { useEffect, useState } from "react";
const uaParser = new UAParser();
export default () => {
  const { t } = useTranslation();
  const [ua, setUa] = useState(window.navigator.userAgent);
  const [uaResult, setUaResult] = useState<UAParser.IResult>();
  const formatUA = (result: UAParser.IResult | undefined) => {
    if (!result) {
      return "";
    }
    let text = result.ua + "\n";
    if (result.browser.name) {
      text += `\n- ${t("tool.userAgent.result.browser")}: ${
        result.browser.name
      } ${result.browser.version}`;
    }
    if (result.device.type) {
      text += `\n- ${t("tool.userAgent.result.device")}: ${
        result.device.type
      } / ${result.device.vendor} / ${result.device.model}`;
    }
    if (result.os.name) {
      text += `\n- ${t("tool.userAgent.result.os")}: ${result.os.name} / ${
        result.os.version
      }`;
    }
    if (result.engine.name) {
      text += `\n- ${t("tool.userAgent.result.engine")}: ${
        result.engine.name
      } / ${result.engine.version}`;
    }
    if (result.cpu.architecture) {
      text += `\n- ${t("tool.userAgent.result.cpu")}: ${
        result.cpu.architecture
      }`;
    }
    return text;
  };
  useEffect(() => {
    uaParser.setUA(ua);
    setUaResult(uaParser.getResult());
  }, [ua]);
  // const [uaParser, setUaParser] = useState<UAParser>();
  return (
    <div>
      <h1>{t("tool.userAgent.title")}</h1>
      <VSCodeTextField
        value={ua}
        onInput={({ target }) => {
          setUa((target as HTMLInputElement).value);
        }}
        style={{ width: "100%" }}
      >
        {t("tool.userAgent.uaTextField.label")}
      </VSCodeTextField>
      <VSCodeTextArea
        style={{ width: "100%" }}
        value={formatUA(uaResult)}
        cols={20}
        rows={8}
        readOnly
      >
        {t("tool.userAgent.resultTextArea.label")}
      </VSCodeTextArea>
    </div>
  );
};
