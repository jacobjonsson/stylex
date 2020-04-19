import plugin from './babel';
import { parseSync, transformFromAstSync } from '@babel/core';

export default function transform(code, options) {
    // Check if the file contains stylex`
    // Otherwise we should skip transforming
    if (!/\b(stylex`)/.test(code)) {
        return { code };
    }

    const ast = parseSync(code, {
        filename: options.filename,
        caller: { name: 'stylex' },
        ...options.babelOptions,
    });

    const { metadata, code: transformedCode } = transformFromAstSync(ast, code, {
        filename: options.filename,
        plugins: [plugin],
        babelrc: false,
        configFile: false,
    });

    if (!metadata?.stylex?.css) {
        return { code };
    }

    return { code: transformedCode, css: metadata.stylex.css };
}
