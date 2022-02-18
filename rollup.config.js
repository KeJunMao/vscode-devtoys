import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
// import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
// import typescript from "@rollup/plugin-typescript";
import esbuild from 'rollup-plugin-esbuild';
import path from "path";
import fs from "fs";
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

const pageTask = fs
  .readdirSync(path.join(__dirname, "svelte-stuff", "pages"))
  .map((input) => {
    const name = input.split(".")[0];
    return {
      input: "svelte-stuff/pages/" + input,
      external: ['react', 'react-dom', 'i18next', 'react-i18next', '@vscode/webview-ui-toolkit', '@vscode/webview-ui-toolkit/react', 'svelte-i18n'],
      output: {
        sourcemap: !production,
        format: "iife",
        name: "app",
        file: "out/compiled/" + name + ".js",
        inlineDynamicImports: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'i18next': 'i18n',
          'react-i18next': 'reactI18next',
          '@vscode/webview-ui-toolkit': 'webviewUiToolkit',
          '@vscode/webview-ui-toolkit/react': 'reactWebviewUiToolkit',
          'svelte-i18n': 'svelteI18n'
        }
      },
      plugins: [
        esbuild({
          tsconfig: "svelte-stuff/tsconfig.json",
          sourceMap: !production,
        }),
        replace({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "process.env.NODE_ENV": production ? JSON.stringify('production') : JSON.stringify('development'),
          preventAssignment: true,
        }),
        svelte({
          dev: !production,
          css: (css) => {
            css.write(name + ".css");
          },
          preprocess: sveltePreprocess(),
        }),
        json(),
        postcss(),
        commonjs(),
        resolve({
          browser: true,
          dedupe: ["svelte"],
        }),
      ],
      watch: {
        clearScreen: false,
      },
    };
  });

const venderTask = [
  // react
  {
    input: "svelte-stuff/vender/react.ts",
    output: {
      sourcemap: true,
      file: "out/vender/react.js",
      format: "iife",
      name: "react",
    },
    plugins: [
      esbuild({
        tsconfig: "svelte-stuff/tsconfig.json",
        sourceMap: !production,
        optimizeDeps: {
          include: ['react', 'react-dom', 'i18next', 'react-i18next', '@vscode/webview-ui-toolkit', '@vscode/webview-ui-toolkit/react'],
        },
        minify: true
      }),
    ]
  },
  // svelte
  {
    input: "svelte-stuff/vender/svelte.ts",
    output: {
      sourcemap: true,
      file: "out/vender/svelte.js",
      format: "iife",
      name: "svelte",
    },
    plugins: [
      esbuild({
        tsconfig: "svelte-stuff/tsconfig.json",
        sourceMap: !production,
        optimizeDeps: {
          include: ['svelte-i18n', '@vscode/webview-ui-toolkit'],
        },
        minify: true
      }),
    ]
  }
];

export default [...venderTask, ...pageTask];
