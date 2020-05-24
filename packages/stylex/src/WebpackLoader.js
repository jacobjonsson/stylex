import loaderUtils from 'loader-utils';
import { transformSync } from '@babel/core';
import { createBabelPlugin } from './BabelPlugin';
import { StyleSheet } from './StyleSheet';
import { virtualModules } from './WebpackVirtualModules';

export default async function loader(source) {
    const callback = this.async();

    if (!/stylex`/.test(source)) {
        return callback(null, source);
    }

    const stylesheet = new StyleSheet();

    const loaderOptions = loaderUtils.getOptions(this) || {};

    /** @type {import('./StyleSheet').StyleSheet} */
    const { babelPresets = [], babelPlugins = [] } = loaderOptions.babelOptions;

    const { code } = transformSync(source, {
        presets: babelPresets,
        plugins: [...babelPlugins, createBabelPlugin({ stylesheet })],
        babelrc: false,
        configFile: false,
    });

    const css = await stylesheet.extractCSS();

    const virtualCssLocation = loaderUtils.interpolateName(
        this,
        '[path][name].[hash:base64:7].css',
        { content: css },
    );
    virtualModules.writeModule(virtualCssLocation, css);

    callback(null, `import "${virtualCssLocation}"\n${code}`);
}
