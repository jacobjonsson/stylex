import webpack from 'webpack';
import loaderUtils from 'loader-utils';
import { transformSync } from '@babel/core';
import { createBabelPlugin } from './BabelPlugin';
import { StyleSheet } from './StyleSheet';

export default async function loader(this: webpack.loader.LoaderContext, source: string) {
    const callback = this.async() as webpack.loader.loaderCallback;

    if (!source.includes('@jacobjonsson/stylex')) {
        return callback(null, source);
    }

    const stylesheet = new StyleSheet();

    const { babelOptions, theme } = loaderUtils.getOptions(this) as Record<string, any>;

    /** @type {import('./StyleSheet').StyleSheet} */
    const { babelPresets = [], babelPlugins = [] } = babelOptions;

    const result = transformSync(source, {
        presets: babelPresets,
        plugins: [...babelPlugins, createBabelPlugin({ stylesheet, theme })],
        babelrc: false,
        configFile: false,
    });

    if (!result) {
        throw new Error(`Failed to transform ${this.request}`);
    }

    callback(null, result.code);
}
