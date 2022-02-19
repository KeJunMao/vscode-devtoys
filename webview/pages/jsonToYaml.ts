import App from "../components/JsonToYaml/index.svelte";
import "../components/JsonToYaml/i18n";

const app = new App({
  target: document.body,
});

export default app;
