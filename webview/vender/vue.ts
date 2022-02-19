import * as Vue from "vue";
import webviewUiToolkit from "@vscode/webview-ui-toolkit";
import * as vueI18n from "vue-i18n";

/// @ts-ignore
window.Vue = Vue;
/// @ts-ignore
window.vueI18n = vueI18n;
/// @ts-ignore
window.webviewUiToolkit = webviewUiToolkit;
