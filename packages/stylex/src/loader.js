import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import loaderUtils from 'loader-utils';
import transform from './transform';

const buildId = '_' + Math.random().toString(36).substr(2, 9);

export default function loader(source) {
    const { cacheDirectory = '.stylex-cache', extension = '.stylex.css', babelOptions } =
        loaderUtils.getOptions(this) || {};

    const outputFilename = path.normalize(
        path.join(
            path.isAbsolute(cacheDirectory)
                ? cacheDirectory
                : path.join(process.cwd(), cacheDirectory),
            `${buildId}${extension}`,
        ),
    );

    const result = transform(source, {
        filename: path.relative(process.cwd(), this.resourcePath),
        outputFilename,
        babelOptions,
    });

    if (!result.css) {
        return source;
    }

    // Read the file first to compare the content
    // Write the new content only if it's changed
    // This will prevent unnecessary WDS reloads
    let currentCssText;

    try {
        currentCssText = fs.readFileSync(outputFilename, 'utf-8');
    } catch (e) {
        // Ignore error
    }

    if (currentCssText !== result.css) {
        mkdirp.sync(path.dirname(outputFilename));
        fs.writeFileSync(outputFilename, result.css.join('\n'));
    }

    return `${result.code}\n\nrequire(${loaderUtils.stringifyRequest(this, outputFilename)});`;
}
