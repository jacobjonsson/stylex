import { OriginalSource } from 'webpack-sources';
import { interpolateName } from 'loader-utils';
import { StyleSheet } from './StyleSheet';
import { virtualModules } from './WebpackVirtualModules';

const SWP = 'stylex-webpack-plugin';

export class StylexPlugin {
    constructor(options = {}) {
        this.babelOptions = options.babelOptions;
    }

    /**
     *
     * @param {import('webpack').Compiler} compiler
     */
    apply(compiler) {
        compiler.apply(virtualModules);
        compiler.options.module.rules.splice(0, 0, {
            test: /\.(js)$/,
            enforce: 'pre',
            use: [
                {
                    loader: require.resolve('./WebpackLoader'),
                    options: {
                        babelOptions: this.babelOptions,
                    },
                },
            ],
        });

        // compiler.hooks.thisCompilation.tap(SWP, (compilation) => {
        //     compilation.hooks.additionalAssets.tapAsync(SWP, async (callback) => {
        //         const css = await this.stylesheet.extractCSS();

        //         // We have no css, no work be done.
        //         if (css.length < 1) {
        //             return callback();
        //         }

        //         const hash = interpolateName(
        //             {},
        //             `[hash:${compiler.options.output.hashDigestLength}]`,
        //             { content: css },
        //         );
        //         const basename = `stylex-${hash}`;
        //         const filename = `${basename}.css`;

        //         // If the file does not already exists, let's create it.
        //         if (!compilation.assets[filename]) {
        //             const content = new OriginalSource(css, basename);
        //             compilation.assets[filename] = content;
        //         }

        //         // Append the file to the chunks with requests.
        //         this.findChunksWithRequests(compilation).forEach((chunk) => {
        //             console.log(chunk.name);
        //             chunk.files.push(filename);
        //         });

        //         callback();
        //     });
        // });
    }

    findChunksWithRequests(compilation) {
        const chunks = compilation.chunks;
        // Map css request for faster lookup.
        const cssRequest = this.stylesheet.getRequests().reduce(
            (acc, curr) => ({
                ...acc,
                [curr]: curr,
            }),
            {},
        );

        // Map all chunks and it's file dependencies.
        const chunkMap = {};
        chunks.forEach((chunk) => {
            chunk.getModules().forEach((module) => {
                if (!module.buildInfo || !module.buildInfo.fileDependencies) {
                    return;
                }

                module.buildInfo.fileDependencies.forEach((filepath) => {
                    if (chunkMap[chunk.name]) {
                        chunkMap[chunk.name] = [...chunkMap[chunk.name], filepath];
                    } else {
                        chunkMap[chunk.name] = [filepath];
                    }
                });
            });
        });

        // Now, filter out the chunks that include the css request.
        const chunksWithRequestsMap = Object.keys(chunkMap)
            .filter((key) => {
                const files = chunkMap[key];
                return files.some((file) => Boolean(cssRequest[file]));
            })
            .reduce((acc, curr) => ({ ...acc, [curr]: curr }), {});

        // Return the actual chunks.
        return chunks.filter((chunk) => chunksWithRequestsMap[chunk.name]);
    }
}
