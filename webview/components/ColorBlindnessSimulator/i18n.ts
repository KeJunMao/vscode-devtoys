import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import zh_CN from "./locales/zh-CN.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    "zh-cn": {
      translation: zh_CN,
    },
  },
  lng: window.displayLanguage,
  lowerCaseLng: true,
  fallbackLng: "en",
});
