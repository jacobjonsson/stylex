import webpack from 'webpack';
import { interpolateName } from 'loader-utils';
import { virtualModules } from './WebpackVirtualModules';
import loadConfig from './utils/loadConfig';
import { StyleSheet } from './StyleSheet';

export interface StylexPluginOptions {
    /**
     * Should css be extracted to a global css file or per file.
     */
    extract: 'module' | 'global' | false;
    /**
     * If global extraction is enabled, then a global entry file needs to be provided.
     */
    globalExtractionFile?: string;
    /**
     * If global extraction is enabled, then a extraction directory needs to be provided.
     */
    extractionDir?: string;
    /**
     * Babel options. Useful if you have custom babel config that stylex should take into account.
     */
    babelOptions: {
        presets: string[];
        plugins: string[];
    };
}

export class StylexPlugin implements webpack.Plugin {
    extract: StylexPluginOptions['extract'];
    globalExtractionFile: StylexPluginOptions['globalExtractionFile'];
    extractionDir: StylexPluginOptions['extractionDir'];
    babelOptions: StylexPluginOptions['babelOptions'];
    config: Record<string, any>;
    stylesheet: StyleSheet;

    constructor(options: StylexPluginOptions) {
        this.extract = options.extract;
        this.globalExtractionFile = options.globalExtractionFile;
        this.extractionDir = options.extractionDir;
        this.babelOptions = options.babelOptions;
        this.config = loadConfig();
        this.stylesheet = new StyleSheet();
    }

    apply(compiler: webpack.Compiler) {
        if (this.extract === 'module') {
            virtualModules.apply(compiler);
        }

        compiler.options.module?.rules.splice(0, 0, {
            test: /\.(js)$/,
            enforce: 'pre',
            use: [
                {
                    loader:
                        this.extract === 'module'
                            ? require.resolve('./WebpackExtractModuleLoader')
                            : this.extract === 'global'
                            ? require.resolve('./WebpackExtractGlobalLoader')
                            : require.resolve('./WebpackNoExtractLoader'),
                    options: {
                        extract: this.extract,
                        babelOptions: this.babelOptions,
                        theme: this.config.theme,
                        stylesheet: this.stylesheet,
                    },
                },
            ],
        });

        compiler.hooks.afterCompile.tapAsync('StylexPlugin', async (compilation, callback) => {
            if (this.extract !== 'global') {
                callback();
                return;
            }

            const css = await this.stylesheet.extractCSS();

            if (!css) {
                callback();
                return;
            }

            // Find chunk with _app.js file
            // @ts-ignore
            const targetChunk = compilation.chunks.find((chunk) => {
                return chunk.files.find((file) => file.includes(this.globalExtractionFile));
            });

            if (!targetChunk) {
                callback();
                return;
            }

            // @ts-ignore
            const hash = interpolateName({}, '[hash:5]', { content: css });
            const name = `${this.extractionDir}/stylex.${hash}.css`;

            compilation.assets[name] = {
                source() {
                    return css;
                },
                size() {
                    return css.length;
                },
            };

            targetChunk.files.push(name);

            callback();
        });
    }
}
