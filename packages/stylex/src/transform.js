import plugin from './babel';
import { parseSync, transformFromAstSync } from '@babel/core';

export default function transform(code, options) {
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
