const fs = require("fs");
const _ = require("lodash");
const path = require("path");

class ThemeJsonGeneratorPlugin {
    static defaultOptions = {
        sourceDirectory: '',
        destinationFile: ''
    }

    constructor(options = {}) {
        this.options = {...ThemeJsonGeneratorPlugin.defaultOptions, ...options};
    }

    apply(compiler) {
        const pluginName = 'Theme.json generator';

        const {webpack} = compiler;

        const {Compilation} = webpack;

        const {RawSource} = webpack.sources;

        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: pluginName,
                    stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
                },
                (assets) => {
                    const fs = require('fs');
                    const path = require('path');
                    const _ = require('lodash');

                    const themeJsonString = fs.readFileSync(`${this.options.sourceDirectory}./theme.json`, { encoding: 'utf-8'});
                    const themeJson = JSON.parse(themeJsonString);

                    const otherFiles = fs.readdirSync(this.options.sourceDirectory);

                    compilation.fileDependencies.add(path.resolve(`${this.options.sourceDirectory}/theme.json`));

                    const fileStrings = [];
                    for(const file of otherFiles) {
                        if(!file.endsWith('.json') || file === 'theme.json') {
                            continue;
                        }

                        compilation.fileDependencies.add(path.resolve(`${this.options.sourceDirectory}/${file}`));

                        const fileString = fs.readFileSync(`${this.options.sourceDirectory}/${file}`, { encoding: 'utf-8'});

                        const jsonPath = file.replace('.json', '')
                            .replace('theme.', '')
                            .replaceAll('-', '/');

                        fileStrings.push({
                            path: jsonPath,
                            dots: file.match(/\.+/g).length,
                            data: JSON.parse(fileString)
                        });
                    }

                    fileStrings.sort((a, b) => a.dots - b.dots);

                    for(const fileString of fileStrings) {
                        _.set(themeJson, fileString.path, fileString.data);
                    }

                    const fileData = JSON.stringify(themeJson, null, 4);

                    fs.writeFileSync(this.options.destinationFile, fileData);

                    compilation.emitAsset(this.options.destinationFile, new RawSource(fileData));
                }
            )
        });
    }
}

module.exports.default = ThemeJsonGeneratorPlugin;
