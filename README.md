# prettier-plugin-vue-component-options

`prettier-plugin-vue-component-options` is a lightweight JavaScript plugin for sorting Vue component options in a specific order. It is a prettier plugin that sorts the following options:

- `name`
- `mixins`
- `components`
- `directives`
- `filters`
- `model`
- `emits`
- `props`
- `setup`
- `data`
- `computed`
- `methods`
- `watch`
- `beforeCreate`
- `created`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `beforeDestroy`
- `destroyed`
- `beforeRouteLeave`

This package is useful for developers who prefer to have their component options organized in a specific way, making it easier to read and maintain their code.

## Installation

You can install prettier-plugin-vue-component-options via npm or yarn.

```bash
npm install prettier-plugin-vue-component-options --save-dev

yarn add prettier-plugin-vue-component-options --dev
```

## Usage

Once `prettier-plugin-vue-component-options` is installed, you can use it as a prettier plugin to format your Vue component files. To change the order as desired, add the following configuration to your prettier.config.js file:

```js
Copy code
module.exports = {
// ...
  optionOrder: [/* your own order */],
};
```

This will sort your Vue component options in the order specified in the optionOrder array. If an option is not included in the array, it will be sorted alphabetically after the specified options.

## Contributing

Pull requests and issues are welcome. If you have any feature requests or bug reports, please open an issue on the GitHub repository.

## License

prettier-plugin-vue-component-options is licensed under the MIT License. See the LICENSE file for more information.
