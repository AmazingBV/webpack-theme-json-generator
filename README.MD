<h1>
  <img width="30" height="30" src="https://webpack.js.org/assets/icon-square-big.svg" alt="webpack">
  webpack-theme-json-generator
</h1>

A plugin for Webpack to generate your WordPress theme.json file from multiple files.

## Installation

Include the package in your project:

`npm install @amazingbv/webpack-theme-json-generator --save-dev`

## Description

The plugin will generate a theme.json file from multiple files. Given a source directory the plugin will use the 'dot notation' to create the correct theme.json structure.

## Usage

Add the plugin to your Webpack config file:

```js
// webpack.config.js
const ThemeJsonGeneratorPlugin = require('@amazingbv/webpack-theme-json-generator').default;

module.exports = {
  // ...
  plugins: [
    new ThemeJsonGenerator({
        sourceDirectory: 'theme-name/theme/',
        destinationFile: 'theme-name/theme.json'
    })
  ]
};
```

Alternatively, you can use this Webpack plugin in your Laravel Mix configuration. To use this, add the following to your Laravel Mix config:

```js
// webpack.mix.js
const ThemeJsonGeneratorPlugin = require('@amazingbv/webpack-theme-json-generator').default;

mix.webpackConfig({
    plugins: [
        new ThemeJsonGeneratorPlugin({
            sourceDirectory: 'theme-name/theme/',
            destinationFile: 'theme-name/theme.json'
        })
    ]
});
```

### Alternative uses

You can also use this plugin to generate other JSON files. To do this, you can change the `sourceFile` and `filePrefix` values. An example of this config could be as follows:

```js
new ThemeJsonGeneratorPlugin({
    sourceFile: 'products.json',
    sourceDirectory: 'sub-dir/products/',
    filePrefix: 'products.',
    destinationFile: 'sub-dir/products.json'
})
```

Above configuration will scan the `sub-dir/products/` directory for all JSON files, taking `products.json` as the base file, instead of `theme.json`. The `filePrefix` value will be used to determine which files to include in the final JSON file. In this case, all files that start with `products.` will be included in the final `products.json` file. 

## File structure

Files in the source directory should be structured like this:

```bash
.
????????? theme/
???   ????????? theme.json
???   ????????? theme.settings.json
???   ????????? theme.settings.typography.json
???   ????????? theme.settings.typography.fontFamilies.json
???   ????????? theme.styles.json
???   ????????? theme.styles.blocks.core-group.json
```

Using a - (dash) in a file name will be formatted to a / (slash) in the theme.json file, so `core-group` will be formatted to `core/group`.

Ofcourse this is just an example. You can split the theme.json file in any way and in any amount of files you want.

## License

MIT
