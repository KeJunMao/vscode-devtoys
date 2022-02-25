//@ts-ignore
import { createApp } from "vue";
import App from "../components/vue/Qrcode/index.vue";
import i18n from "../components/vue/Qrcode/i18n";

createApp(App).use(i18n).mount("#root");
