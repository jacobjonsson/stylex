import webpack from 'webpack';
import loaderUtils from 'loader-utils';
import { transformSync } from '@babel/core';
import { createBabelPlugin } from './BabelPlugin';

export default async function loader(this: webpack.loader.LoaderContext, source: string) {
    const callback = this.async() as webpack.loader.loaderCallback;

    if (!source.includes('@jacobjonsson/stylex')) {
        return callback(null, source);
    }

    const { babelOptions, theme, stylesheet } = loaderUtils.getOptions(this) as Record<string, any>;
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
