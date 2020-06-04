import webpack from 'webpack';
import { virtualModules } from './WebpackVirtualModules';
import loadConfig from './utils/loadConfig';

export interface StylexPluginOptions {
    babelOptions: {
        presets: string[];
        plugins: string[];
    };
}

export class StylexPlugin implements webpack.Plugin {
    babelOptions: Record<string, any>;
    config: Record<string, any>;

    constructor(options: StylexPluginOptions) {
        this.babelOptions = options.babelOptions;
        this.config = loadConfig();
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
                        theme: this.config.theme,
                    },
                },
            ],
        });
    }
}
