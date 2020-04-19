import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import loaderUtils from 'loader-utils';
import transform from './transform';

const buildId = '_' + Math.random().toString(36).substr(2, 9);
const extension = '.stylex.css';
const cacheDirectory = '.stylex-cache';

export default function loader(source) {
    const { babelOptions } = loaderUtils.getOptions(this) || {};

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

    let currentCssText;
    try {
        currentCssText = fs.readFileSync(outputFilename, 'utf-8');
    } catch (e) {}

    if (currentCssText !== result.css) {
        mkdirp.sync(path.dirname(outputFilename));
        fs.writeFileSync(outputFilename, result.css.join('\n'));
    }

    return `require(${loaderUtils.stringifyRequest(this, outputFilename)});\n${result.code}`;
}
