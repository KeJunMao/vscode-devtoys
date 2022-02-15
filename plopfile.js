const notEmpty = name => v =>
  !v || v.trim() === '' ? `${name} is required` : true;

module.exports = function (plop) {
  const sentenceCase = plop.getHelper('sentenceCase');
  const titleCase = plop.getHelper('titleCase');
  const lowerCase = plop.getHelper('lowerCase');
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
          'Generators'
        ],
        filter(val) {
          switch (val) {
            case 'Encoder/Decoder':
              return 'Coders';
            case 'Convertors':
              return 'Convertors';
            case 'Generators':
              return 'Generators';
          }
        }
      }
    ],
    actions(data) {
      const actions = [
        // PAGE
        {
          type: 'add',
          path: 'svelte-stuff/pages/{{pascalCase label}}.ts',
          templateFile: 'plop-template/svelte-stuff/page/index.hbs',
          data: {
            component: sentenceCase(data.label),
          }
        },
        // COMPONENT
        {
          type: 'add',
          path: 'svelte-stuff/components/{{sentenceCase label}}/index.svelte',
          templateFile: 'plop-template/svelte-stuff/component/index.hbs',
          data: {
            title: titleCase(data.title),
          }
        },
        // PANEL
        {
          type: 'add',
          path: 'src/Panel/{{sentenceCase label}}.ts',
          templateFile: 'plop-template/panel/index.hbs',
          data: {
            className: sentenceCase(data.label),
            panelType: lowerCase(data.label),
            category: lowerCase(data.category),
          }
        },
        // COMPONENT I18N
        {
          type: 'add',
          path: 'svelte-stuff/components/{{sentenceCase label}}/locales/en.json',
          templateFile: 'plop-template/svelte-stuff/component/i18n/en.json',
        },
        {
          type: 'add',
          path: 'svelte-stuff/components/{{sentenceCase label}}/locales/zh-CN.json',
          templateFile: 'plop-template/svelte-stuff/component/i18n/zh-CN.json',
        },
        {
          type: 'add',
          path: 'svelte-stuff/components/{{sentenceCase label}}/i18n.ts',
          templateFile: 'plop-template/svelte-stuff/component/i18n.hbs',
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
