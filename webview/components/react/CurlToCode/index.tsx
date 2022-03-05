import { useTranslation } from "react-i18next";
import {
  VSCodeTextArea,
  VSCodeDropdown,
  VSCodeOption,
} from "@vscode/webview-ui-toolkit/react/index";
import { useEffect, useState } from "react";
export default () => {
  const { t } = useTranslation();
  const languageOptions = [
    {
      label: "Ansible",
      value: "toAnsible",
    },
    {
      label: "Browser",
      value: "toBrowser",
    },
    {
      label: "Dart",
      value: "toDart",
    },
    {
      label: "Elixir",
      value: "toElixir",
    },
    {
      label: "Go",
      value: "toGo",
    },
    {
      label: "Java",
      value: "toJava",
    },
    {
      label: "Json",
      value: "toJsonString",
    },
    {
      label: "MATLAB",
      value: "toMATLAB",
    },
    {
      label: "NodeFetch",
      value: "toNodeFetch",
    },
    {
      label: "NodeRequest",
      value: "toNodeRequest",
    },
    {
      label: "Php",
      value: "toPhp",
    },
    {
      label: "Python",
      value: "toPython",
    },
    {
      label: "R",
      value: "toR",
    },
    {
      label: "Rust",
      value: "toRust",
    },
    {
      label: "Strest",
      value: "toStrest",
    },
  ];
  const [language, setLanguage] = useState("toPython");
  const [command, setCommand] = useState("curl example.com");
  const [output, setOutput] = useState("");
  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        setOutput(event.data);
      },
      {
        once: true,
      }
    );
    tsvscode.postMessage({
      type: "onConvert",
      value: {
        language,
        command,
      },
    });
  }, [language, command]);

  return (
    <div>
      <h1>{t("tool.curlToCode.title")}</h1>
      <VSCodeTextArea
        style={{
          width: "100%",
        }}
        cols={20}
        rows={10}
        value={command}
        onInput={({ target }) => setCommand((target as HTMLInputElement).value)}
      >
        {t("tool.curlToCode.commandTextArea.label")}
      </VSCodeTextArea>
      <VSCodeDropdown
        value={language}
        onChange={({ target }) => {
          setLanguage((target as HTMLInputElement).value);
        }}
      >
        {languageOptions.map((option) => {
          return (
            <VSCodeOption value={option.value} key={option.value}>
              {option.label}
            </VSCodeOption>
          );
        })}
      </VSCodeDropdown>
      <VSCodeTextArea
        style={{
          width: "100%",
        }}
        cols={20}
        rows={10}
        value={output}
        readOnly
      ></VSCodeTextArea>
    </div>
  );
};
