//@ts-ignore
import { createApp } from "vue";
import App from "../components/vue/Jwt/index.vue";
import i18n from "../components/vue/Jwt/i18n";

createApp(App).use(i18n).mount("#root");
