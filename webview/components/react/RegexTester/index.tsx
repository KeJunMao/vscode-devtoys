import { useState } from "react";
import { useTranslation } from "react-i18next";
import CodeBox from "./components/CodeBox";
import MatchBox from "./components/MatchBox";

export default () => {
  const { t } = useTranslation();
  const [regex, setRegex] = useState<RegExp | undefined>(
    new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$")
  );
  const [text, setText] = useState<string>(`best-way
best-d4ys
my-1ife
@t-the-sky
at-the--sky
-
a
fly-

*`);
  return (
    <div>
      <h1>{t("tool.regexTester.title")}</h1>
      <CodeBox
        onInput={(reg) => {
          setRegex(reg);
        }}
        regex={regex}
      ></CodeBox>
      <MatchBox
        onInput={(value) => {
          setText(value);
        }}
        text={text}
        regex={regex}
      ></MatchBox>
    </div>
  );
};
