import { VSCodeTextArea } from "@vscode/webview-ui-toolkit/react/index";
import { useEffect, useRef, useState } from "react";
import "./MatchBox.css";
import autosize from "autosize";
import { useTranslation } from "react-i18next";
import WokerBuilder from "../woker/WokerBuilder";
import MainWorker from "../woker/MainWorker";
let typeTimeout: number | undefined;

export default ({
  regex,
  text = "",
  onInput,
}: {
  regex: RegExp | undefined;
  text?: string;
  onInput: (value: string) => void;
}) => {
  let worker: Worker | undefined;
  const { t } = useTranslation();

  const textarea = useRef<HTMLTextAreaElement>(null);
  const highlight = useRef<HTMLDivElement>(null);
  const handleKeyUp = () => {
    resizeTextarea();
    if (typeTimeout) {
      clearTimeout(typeTimeout);
    }
    typeTimeout = setTimeout(() => {
      boxEdited();
    }, 50);
  };
  const resizeTextarea = () => {
    if (textarea.current) {
      /// @ts-ignore
      textarea.current.control.style.background = "transparent";
      /// @ts-ignore
      autosize(textarea.current.control);
    }
    /// @ts-ignore
  };
  function getMatchTextOnly() {
    return text;
  }

  function applyHighlights(text: string) {
    let fixedText = htmlEncode(text);
    fixedText = fixedText.replace(/\n$/g, "\n\n");
    fixedText = `<mark>${fixedText}</mark>`;
    return fixedText;
  }
  function htmlEncode(text: string) {
    return text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  const highlightHtml = (matches: RegExpMatchArray[]) => {
    let markedText = "";
    let lastEndPos = 0;
    let lastPart = "";
    for (let match of matches) {
      if (!match) {
        return;
      }
      const startPos = match.index || 0;
      const endPos = startPos + match[0].length;
      const lengthOfBeginPart = startPos - lastEndPos;
      const beginPart = text.substr(lastEndPos, lengthOfBeginPart);
      lastPart = text.substr(endPos);
      //string matched
      const matchStr = text.substr(startPos, match[0].length);
      const encodedMatchStr = applyHighlights(matchStr);
      // html encoded parts
      const encodedBeginPart = htmlEncode(beginPart);
      // text from begining to match string (including)
      const textTillStr = encodedBeginPart + encodedMatchStr;
      markedText += textTillStr;
      // Add lastIndex the length of begin part + matchStr
      lastEndPos = endPos;
    }
    // add the final unmatched lastPart
    markedText += htmlEncode(lastPart);
    if (highlight?.current) {
      highlight.current.innerHTML = markedText;
    }
    setTimeout(() => {
      resizeTextarea();
    }, 50);
  };
  const boxEdited = () => {
    let text = getMatchTextOnly();
    let matches = [];
    let timmer: number | undefined;
    if (!regex) {
      return;
    }
    if (worker) {
      worker.terminate();
      worker = undefined;
    }
    worker = new WokerBuilder(MainWorker) as Worker;
    return new Promise<void>((r, j) => {
      if (!worker) {
        return;
      }
      timmer = setTimeout(() => {
        worker?.terminate();
        worker = undefined;
        j();
      }, 300);
      worker.onmessage = (e) => {
        clearTimeout(timmer);
        matches = e.data;
        highlightHtml(matches);
        r();
      };
      worker?.postMessage({
        text,
        regex,
      });
    });
  };

  useEffect(() => {
    boxEdited()?.catch(() => {
      highlightHtml([]);
      tsvscode.postMessage({
        type: "onError",
        value: t("tool.regexTester.onError.timeout"),
      });
    });
  }, [text, regex]);

  return (
    <div className="matchbox-container">
      <div ref={highlight} className="highlights"></div>
      <VSCodeTextArea
        ref={textarea as any}
        style={{
          width: "100%",
        }}
        value={text}
        onInput={({ target }) => {
          onInput((target as HTMLTextAreaElement).value);
        }}
        onKeyUp={handleKeyUp}
        rows={10}
      >
        {t("tool.regexTester.matchbox.label")}
      </VSCodeTextArea>
    </div>
  );
};
