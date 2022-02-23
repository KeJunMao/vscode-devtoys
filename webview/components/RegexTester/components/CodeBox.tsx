import React, { useEffect, useRef, useState } from "react";
import RegexColorize from "regex-colorize";
import "regex-colorize/themes/sweetest.css";
import "./CodeBox.css";
import {
  VSCodeProgressRing,
  VSCodeCheckbox,
} from "@vscode/webview-ui-toolkit/react/index";
import { useTranslation } from "react-i18next";

let rgx = new RegexColorize();
rgx.colorizeAll();

export default ({
  regex,
  onInput,
}: {
  regex: RegExp | undefined;
  onInput: (value: RegExp | undefined) => void;
}) => {
  const { t } = useTranslation();

  const [debounceTimer, setDebounceTimer] = useState<number | undefined>(
    undefined
  );
  const [changeTimer, setChangeTimer] = useState<number | undefined>(undefined);
  const [regexError, setRegexError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [flag, setFlag] = useState<string[]>(["g", "m"]);
  const codebox = useRef<HTMLDivElement>(null);

  const handleFlagChange = (f: string, target: any) => {
    if (target.checked) {
      if (!flag.includes(f)) {
        setFlag([...flag, f]);
      }
    } else {
      setFlag(flag.filter((v) => v !== f));
    }
  };
  const handleKeyUp = (event?: React.KeyboardEvent<HTMLDivElement>) => {
    setLoading(true);
    clearTimeout(debounceTimer);
    setDebounceTimer(
      setTimeout(() => {
        let isValid = true;
        let reg;
        try {
          /// @ts-ignore
          reg = new RegExp(codebox.current.textContent, flag.join(""));
          setRegexError(false);
        } catch (e) {
          isValid = false;
          setRegexError(true);
        }
        if (changeTimer) {
          clearTimeout(changeTimer);
        }
        setChangeTimer(
          setTimeout(() => {
            rgx.colorizeAll();
          }, 3000)
        );
        if (isValid) {
          onInput(reg);
        }
        setLoading(false);
      }, 700)
    );
  };
  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    setTimeout(() => {
      document.execCommand("insertHTML", false, text);
    }, 0);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      handleKeyUp();
    }, 500);
    return () => clearTimeout(timer);
  }, [flag]);
  return (
    <div>
      <div className={regexError ? "codebox-error" : ""}>
        <label className="regex-input__label" htmlFor="regex">
          {t("tool.regexTester.codebox.label")}
        </label>
        <div className="regex-input__root">
          <div
            id="regex"
            ref={codebox}
            className="regex-input__control regex"
            contentEditable={true}
            onKeyUp={handleKeyUp}
            onPaste={handlePaste}
            suppressContentEditableWarning={true}
          >
            {regex?.source}
          </div>
          {loading && (
            <VSCodeProgressRing
              style={{
                width: "15px",
                marginRight: "10px",
              }}
            ></VSCodeProgressRing>
          )}
        </div>
      </div>
      <VSCodeCheckbox
        onChange={({ target }) => handleFlagChange("g", target)}
        checked={flag.includes("g")}
      >
        <b>g</b> {t("tool.regexTester.codebox.option.g")}
      </VSCodeCheckbox>
      <VSCodeCheckbox
        onChange={({ target }) => handleFlagChange("i", target)}
        checked={flag.includes("i")}
      >
        <b>i</b> {t("tool.regexTester.codebox.option.i")}
      </VSCodeCheckbox>
      <VSCodeCheckbox
        onChange={({ target }) => handleFlagChange("m", target)}
        checked={flag.includes("m")}
      >
        <b>m</b> {t("tool.regexTester.codebox.option.m")}
      </VSCodeCheckbox>
      <VSCodeCheckbox
        onChange={({ target }) => handleFlagChange("s", target)}
        checked={flag.includes("s")}
      >
        <b>s</b> {t("tool.regexTester.codebox.option.s")}
      </VSCodeCheckbox>
      <VSCodeCheckbox
        onChange={({ target }) => handleFlagChange("u", target)}
        checked={flag.includes("u")}
      >
        <b>u</b> {t("tool.regexTester.codebox.option.u")}
      </VSCodeCheckbox>
      <VSCodeCheckbox
        onChange={({ target }) => handleFlagChange("y", target)}
        checked={flag.includes("y")}
      >
        <b>y</b> {t("tool.regexTester.codebox.option.y")}
      </VSCodeCheckbox>
    </div>
  );
};
