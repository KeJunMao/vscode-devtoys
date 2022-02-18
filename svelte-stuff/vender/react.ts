import react from "react";
import reactDOM from "react-dom";
import * as i18n from "i18next";
import * as reactI18next from "react-i18next";
import webviewUiToolkit from "@vscode/webview-ui-toolkit";
import * as reactWebviewUiToolkit from "@vscode/webview-ui-toolkit/react";

window.React = react;
window.ReactDOM = reactDOM;
// @ts-ignore
window.i18n = i18n;
// @ts-ignore
window.reactI18next = reactI18next;
// @ts-ignore
window.webviewUiToolkit = webviewUiToolkit;
// @ts-ignore
window.reactWebviewUiToolkit = reactWebviewUiToolkit;
