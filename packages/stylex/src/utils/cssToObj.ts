import postcss from 'postcss';
import postcssNested from 'postcss-nested';
import { parse, StyleRules } from 'css';

const SEL = '_';
const SELRE = new RegExp('^' + SEL);

/**
 * Turns a css string into an object
 * @param {string} css
 * @returns {object}
 */
export function cssToObj(css: string) {
    const a = postcss([postcssNested]).process(`${SEL} {${css}}`).css;
    const ast = parse(a);
    if (!ast.stylesheet) {
        return {};
    }

    return transform(ast.stylesheet.rules);
}

function transform(rules: StyleRules['rules'], result: Record<string, any> = {}) {
    rules.forEach((rule) => {
        if ('media' in rule && 'rules' in rule && rule.rules) {
            const key = '@media ' + rule.media;
            const decs = transform(rule.rules);
            result[key] = decs;
            return;
        }

        if (!('selectors' in rule) || !rule.selectors) {
            return;
        }

        const [selector] = rule.selectors;
        const key = selector.replace(SELRE, '').trim();

        if (key.length) {
            result = {
                ...result,
                [key]: getDeclarations(rule.declarations),
            };
        } else {
            result = {
                ...result,
                ...getDeclarations(rule.declarations),
            };
        }
    });

    return result;
}

function getDeclarations(decs: any) {
    return decs.reduce((acc: any, d: any) => {
        return {
            ...acc,
            [d.property]: d.value,
        };
    }, {});
}
