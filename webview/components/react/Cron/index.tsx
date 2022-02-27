import { useTranslation } from "react-i18next";
import {
  VSCodeTextArea,
  VSCodeTextField,
} from "@vscode/webview-ui-toolkit/react/index";
import { useEffect, useState } from "react";
import parser from "cron-parser";
export default () => {
  const { t } = useTranslation();
  const [cron, setCron] = useState("0 */12 * * * *");
  const [preResult, setPreResult] = useState<string>("");
  const [nextResult, setNextResult] = useState<string>("");
  const tips = `*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7, 1L - 7L) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31, L)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, optional)`;
  useEffect(() => {
    try {
      const prev = parser.parseExpression(cron);
      const next = parser.parseExpression(cron);
      const prevResults = [
        prev.prev(),
        prev.prev(),
        prev.prev(),
        prev.prev(),
        prev.prev(),
        prev.prev(),
        prev.prev(),
      ];
      const nextResults = [
        next.next(),
        next.next(),
        next.next(),
        next.next(),
        next.next(),
        next.next(),
        next.next(),
      ];
      setPreResult(
        prevResults.map((item) => item.toDate().toLocaleString()).join("\n")
      );
      setNextResult(
        nextResults.map((item) => item.toDate().toLocaleString()).join("\n")
      );
    } catch (error) {
      setPreResult(String(error));
      setNextResult(String(error));
    }
  }, [cron]);
  return (
    <div>
      <h1> {t("tool.cron.title")}</h1>
      <VSCodeTextField
        value={cron}
        style={{ width: "100%" }}
        onInput={({ target }) => {
          setCron((target as HTMLInputElement).value);
        }}
        placeholder="0 */12 * * * *"
      >
        {t("tool.cron.crontextField.label")}
      </VSCodeTextField>
      <VSCodeTextArea
        value={preResult}
        readOnly
        style={{ width: "100%" }}
        cols={10}
        rows={8}
      >
        {t("tool.cron.firstTextArea.label")}
      </VSCodeTextArea>
      <VSCodeTextArea
        value={nextResult}
        readOnly
        style={{ width: "100%" }}
        cols={10}
        rows={8}
      >
        {t("tool.cron.lastTextArea.label")}
      </VSCodeTextArea>
      <pre>
        <code
          style={{
            width: "100%",
            fontFamily:
              "Menlo,Monaco,Consolas,Andale Mono,lucida console,Courier New,monospace",
          }}
        >
          {tips}
        </code>
      </pre>
    </div>
  );
};
