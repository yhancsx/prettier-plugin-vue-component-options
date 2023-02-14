import { parsers as htmlParsers } from 'prettier/parser-html';

import preprocess from './preprocessor';

const options = {
  optionOrders: {
    type: 'path',
    category: 'Global',
    array: true,
    default: [
      {
        value: [
          'name',
          'title',
          '$_veeValidate',
          'inject',
          'mixins',
          'components',
          'directives',
          'filters',
          'model',
          'props',
          'data',
          'apollo',
          'computed',
          'methods',
          'watch',
          'beforeCreate',
          'created',
          'updated',
          'mounted',
          'beforeDestroy',
          'destroyed',
          'beforeRouteLeave',
        ],
      },
    ],
    description: 'Provide an order to sort component options.',
  },
};

module.exports = {
  parsers: {
    vue: {
      ...htmlParsers.vue,
      preprocess,
    },
  },
  options,
};
