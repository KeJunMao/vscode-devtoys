// import { addMessages, init } from "svelte-i18n";
import en from "./locales/en.json";
import zh_CN from "./locales/zh-CN.json";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "en",
  messages: {
    en: {
      message: en,
    },
    "zh-cn": {
      message: zh_CN,
    },
  },
});
export default i18n;
