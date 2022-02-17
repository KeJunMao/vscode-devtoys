const notEmpty = name => v =>
  !v || v.trim() === '' ? `${name} is required` : true;

module.exports = function (plop) {
  const sentenceCase = plop.getHelper('sentenceCase');
  const titleCase = plop.getHelper('titleCase');
  const lowerCase = plop.getHelper('lowerCase');
  const pascalCase = plop.getHelper('pascalCase');
  plop.setGenerator('tool', {
    description: 'this is a skeleton plopfile',
    prompts: [
      {
        type: 'input',
        name: 'label',
        message: 'Tool label',
        validate: notEmpty('label')
      },
      // {
      //   type: 'input',
      //   name: 'tooltip',
      //   message: 'Tool tooltip',
      //   default(data) {
      //     return data.label;
      //   }
      // },
      {
        type: 'input',
        name: 'title',
        message: 'Tool panel title',
        default(data) {
          return data.label;
        }
      },
      {
        type: 'list',
        name: 'category',
        message: 'Tool category',
        choices: [
          'Encoder/Decoder',
          'Convertors',
          'Generators',
          'Text',
          'Graphic'
        ],
        filter(val) {
          switch (val) {
            case 'Encoder/Decoder':
              return 'Coders';
            default:
              return val;
          }
        }
      },
      {
        type: 'list',
        name: 'framework',
        message: 'Tool webview framework',
        choices: [
          'React',
          'Svelte',
        ],
        default: "React"
      }
    ],
    actions(data) {
      const framework = lowerCase(data.framework);
      const pageExt = framework === 'react' ? 'tsx' : 'ts';
      const componentExt = framework === 'react' ? 'tsx' : 'svelte';
      const actions = [
        // PAGE
        {
          type: 'add',
          path: `svelte-stuff/pages/{{sentenceCase label}}.${pageExt}`,
          templateFile: `plop-template/svelte-stuff/page/${framework}/index.hbs`,
          data: {
            component: pascalCase(data.label),
          }
        },
        // COMPONENT
        {
          type: 'add',
          path: `svelte-stuff/components/{{pascalCase label}}/index.${componentExt}`,
          templateFile: `plop-template/svelte-stuff/component/${framework}/index.hbs`,
          data: {
            title: titleCase(data.title),
          }
        },
        // PANEL
        {
          type: 'add',
          path: 'src/Panel/{{pascalCase label}}.ts',
          templateFile: 'plop-template/panel/index.hbs',
          data: {
            className: pascalCase(data.label),
            panelType: sentenceCase(data.label),
            category: lowerCase(data.category),
          }
        },
        // COMPONENT I18N
        {
          type: 'add',
          path: 'svelte-stuff/components/{{pascalCase label}}/locales/en.json',
          templateFile: 'plop-template/svelte-stuff/component/i18n/en.json',
        },
        {
          type: 'add',
          path: 'svelte-stuff/components/{{pascalCase label}}/locales/zh-CN.json',
          templateFile: 'plop-template/svelte-stuff/component/i18n/zh-CN.json',
        },
        {
          type: 'add',
          path: 'svelte-stuff/components/{{pascalCase label}}/i18n.ts',
          templateFile: `plop-template/svelte-stuff/component/${framework}/i18n.hbs`,
        },
        // // TODO: TREE src/Tree
        // {
        //   type: "modify",
        // },
        // // TODO: PANEL TYPE src/common/IToolData.ts
        // {
        //   type: 'modify'
        // }
      ];
      return actions;
    }
  });
};
