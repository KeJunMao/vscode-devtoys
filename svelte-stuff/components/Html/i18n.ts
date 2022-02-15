import { addMessages, init } from "svelte-i18n";
import en from "./locales/en.json";
import zh_CN from "./locales/zh-CN.json";
addMessages("en", en);
addMessages("zh-cn", zh_CN);

init({
  fallbackLocale: "en",
  initialLocale: window.displayLanguage,
});
