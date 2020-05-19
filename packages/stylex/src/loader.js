import loaderUtils from 'loader-utils';
import { transformSync } from '@babel/core';
import { createBabelPlugin } from './plugin';

export default async function loader(source) {
    const callback = this.async();

    if (!/\b(stylex`)/.test(source)) {
        return callback(null, source);
    }

    const { babelOptions, store } = loaderUtils.getOptions(this) || {};

    const babelPresets = babelOptions.presets || [];
    const babelPlugins = babelOptions.plugins || [];

    const { code } = transformSync(source, {
        presets: babelPresets,
        plugins: [...babelPlugins, createBabelPlugin({ store })],
        babelrc: false,
        configFile: false,
    });

    store.addRequest(this.resource);

    callback(null, code);
}
