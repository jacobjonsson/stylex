import webpack from 'webpack';
import { virtualModules } from './WebpackVirtualModules';
import loadConfig from './utils/loadConfig';

export class StylexPlugin implements webpack.Plugin {
    babelOptions: Record<string, any>;

    constructor(options: Record<string, any> = {}) {
        this.babelOptions = options.babelOptions;
    }

    apply(compiler: webpack.Compiler) {
        virtualModules.apply(compiler);

        compiler.options.module?.rules.splice(0, 0, {
            test: /\.(js)$/,
            enforce: 'pre',
            use: [
                {
                    loader: require.resolve('./WebpackLoader'),
                    options: {
                        babelOptions: this.babelOptions,
                        theme: loadConfig().theme,
                    },
                },
            ],
        });
    }
}
