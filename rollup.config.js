import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import sveltePreprocess from "svelte-preprocess";
import esbuild from 'rollup-plugin-esbuild';
import path from "path";
import fs from "fs";
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import vue from '@vitejs/plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

const production = !process.env.ROLLUP_WATCH;

const globalVender = ['@vscode/webview-ui-toolkit'];

const reactVender = ['react', 'react-dom', 'i18next', 'react-i18next', '@vscode/webview-ui-toolkit/react'];
const svelteVender = ['svelte-i18n'];
const vueVender = ['vue', 'vue-i18n'];

function genRollupConfigByName(name) {
  switch (name) {
    case 'jwt':
      return {
        plugins: [
          globals(),
          builtins({ crypto: false })
        ],
        banner: 'window.module = {};'
      };
  }
  return {
    plugins: [],
    banner: ''
  };
}

const pageTask = fs
  .readdirSync(path.join(__dirname, "webview", "pages"))
  .map((input) => {
    const name = input.split(".")[0];
    const { plugins, banner } = genRollupConfigByName(name);

    return {
      input: "webview/pages/" + input,
      external: [...globalVender, ...reactVender, svelteVender, vueVender],
      context: 'window',
      moduleContext: {
        'window': "'window'"
      },
      output: {
        banner: banner,
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
          'svelte-i18n': 'svelteI18n',
          'vue': 'Vue',
          'vue-i18n': 'VueI18n',
        }
      },
      plugins: [
        esbuild({
          tsconfig: "webview/tsconfig.json",
          sourceMap: !production,
        }),
        ...plugins,
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
        vue({
          template: {
            compilerOptions: {
              // treat all tags with a dash as custom elements
              isCustomElement: (tag) => tag.includes('vscode-')
            }
          }
        }),
        json(),
        postcss(),
        commonjs({
          include: 'node_modules/**',
          esmExternals: true,
          transformMixedEsModules: true,
        }),
        nodeResolve({
          browser: true,
          preferBuiltins: true,
          dedupe: ['svelte'],
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
    input: "webview/vender/react.ts",
    output: {
      sourcemap: true,
      file: "out/vender/react.js",
      format: "iife",
      name: "react",
    },
    plugins: [
      esbuild({
        tsconfig: "webview/tsconfig.json",
        sourceMap: !production,
        optimizeDeps: {
          include: [...globalVender, ...reactVender],
        },
        minify: true
      }),
    ]
  },
  // svelte
  {
    input: "webview/vender/svelte.ts",
    output: {
      sourcemap: true,
      file: "out/vender/svelte.js",
      format: "iife",
      name: "svelte",
    },
    plugins: [
      esbuild({
        tsconfig: "webview/tsconfig.json",
        sourceMap: !production,
        optimizeDeps: {
          include: [...svelteVender, ...globalVender],
        },
        minify: true
      }),
    ]
  },
  // vue
  {
    input: "webview/vender/vue.ts",
    output: {
      sourcemap: true,
      file: "out/vender/vue.js",
      format: "iife",
      name: "vue",
    },
    plugins: [
      esbuild({
        tsconfig: "webview/tsconfig.json",
        sourceMap: !production,
        optimizeDeps: {
          include: [...vueVender, ...globalVender],
        },
        minify: true
      }),
    ]
  }
];

export default [
  ...venderTask,
  ...pageTask
];
