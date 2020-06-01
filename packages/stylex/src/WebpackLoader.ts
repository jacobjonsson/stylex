import webpack from 'webpack';
import loaderUtils from 'loader-utils';
import { transformSync } from '@babel/core';
import { createBabelPlugin } from './BabelPlugin';
import { StyleSheet } from './StyleSheet';
import { virtualModules } from './WebpackVirtualModules';

export default async function loader(this: webpack.loader.LoaderContext, source: string) {
    const callback = this.async() as webpack.loader.loaderCallback;

    if (!/stylex`/.test(source)) {
        return callback(null, source);
    }

    const stylesheet = new StyleSheet();

    const { babelOptions } = loaderUtils.getOptions(this) as Record<string, any>;

    /** @type {import('./StyleSheet').StyleSheet} */
    const { babelPresets = [], babelPlugins = [] } = babelOptions;

    const result = transformSync(source, {
        presets: babelPresets,
        plugins: [...babelPlugins, createBabelPlugin({ stylesheet })],
        babelrc: false,
        configFile: false,
    });

    if (!result) {
        throw new Error(`Failed to transform ${this.request}`);
    }

    const css = await stylesheet.extractCSS();

    const virtualCssLocation = loaderUtils.interpolateName(
        this,
        '[path][name].[hash:base64:7].css',
        { content: css },
    );
    virtualModules.writeModule(virtualCssLocation, css);

    callback(null, `import "${virtualCssLocation}"\n${result.code}`);
}
