import { VSCodeTextArea } from "@vscode/webview-ui-toolkit/react/index";
import { useEffect, useRef, useState } from "react";
import "./MatchBox.css";
import autosize from "autosize";
import { useTranslation } from "react-i18next";
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
  const boxEdited = () => {
    let text = getMatchTextOnly();
    let markedText = "";
    let matches;
    if (!regex) {
      return;
    }
    if (regex.flags.includes("g")) {
      matches = [...text.matchAll(regex)];
    } else {
      // if matches? add to array else empty []
      matches = text.match(regex) ? [text.match(regex)] : [];
    }
    // each match will have
    //   0 -> match
    //   1,2,etc -> group matches
    //   index -> pos of
    //   input -> input str
    //   length -> number of matches incl groups
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

  useEffect(() => {
    boxEdited();
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
