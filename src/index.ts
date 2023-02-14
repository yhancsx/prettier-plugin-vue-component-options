import { parsers as htmlParsers } from 'prettier/parser-html';

import preprocess from './preprocessor';

const options = {
  optionOrder: {
    type: 'path',
    category: 'Global',
    array: true,
    default: [
      {
        value: [
          `name`,
          `mixins`,
          `components`,
          `directives`,
          `filters`,
          `model`,
          `emits`,
          `props`,
          `setup`,
          `data`,
          `computed`,
          `methods`,
          `watch`,
          `beforeCreate`,
          `created`,
          `beforeMount`,
          `mounted`,
          `beforeUpdate`,
          `updated`,
          `beforeDestroy`,
          `destroyed`,
          `beforeRouteLeave`,
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
