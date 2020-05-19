import { OriginalSource } from 'webpack-sources';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import { sortMQPlugin } from './postcss/sortMQPlugin';
import { interpolateName } from 'loader-utils';
import { Store } from './store';

const SWP = 'stylex-webpack-plugin';

export class StylexPlugin {
    constructor(options = {}) {
        this.store = new Store();
        this.babelOptions = options.babelOptions;
        this.store = new Store();
    }

    /**
     *
     * @param {import('webpack').Compiler} compiler
     */
    apply(compiler) {
        compiler.hooks.normalModuleFactory.tap(SWP, (normalModuleFactory) => {
            normalModuleFactory.hooks.afterResolve.tapAsync(SWP, (data, callback) => {
                data.loaders.push({
                    loader: require.resolve('./loader'),
                    options: {
                        store: this.store,
                        babelOptions: this.babelOptions,
                    },
                });

                callback(null, data);
            });
        });

        compiler.hooks.thisCompilation.tap(SWP, (compilation) => {
            compilation.hooks.additionalAssets.tapAsync(SWP, async (callback) => {
                const css = await this.store.extractCSS();

                const hash = interpolateName(
                    {},
                    `[hash:${compiler.options.output.hashDigestLength}]`,
                    { content: css },
                );
                const basename = `stylex-${hash}`;
                const filename = `${basename}.css`;

                // If the file does not already exists, let's create it.
                if (!compilation.assets[filename]) {
                    const content = new OriginalSource(css, basename);
                    compilation.assets[filename] = content;
                }

                // Append the file to the chunks with requests.
                this.findChunksWithRequests(compilation).forEach((chunk) => {
                    chunk.files.push(filename);
                });

                callback();
            });
        });
    }

    findChunksWithRequests(compilation) {
        const chunks = compilation.chunks;
        // Map css request for faster lookup.
        const cssRequest = this.store.getRequests().reduce(
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
