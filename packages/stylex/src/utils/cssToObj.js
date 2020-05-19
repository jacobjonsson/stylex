import postcss from 'postcss';
import postcssNested from 'postcss-nested';
import { parse } from 'css';

const SEL = '_';
const SELRE = new RegExp('^' + SEL);

/**
 * Turns a css string into an object
 * @param {string} css
 * @returns {object}
 */
export default function cssToObj(css) {
    const a = postcss([postcssNested]).process(`${SEL} {${css}}`).css;
    const ast = parse(a);
    return transform(ast.stylesheet.rules);
}

function transform(rules, result = {}) {
    rules.forEach((rule) => {
        if (rule.type === 'media') {
            const key = '@media ' + rule.media;
            const decs = transform(rule.rules);
            result[key] = decs;
            return;
        }

        const [selector] = rule.selectors;
        const key = selector.replace(SELRE, '').trim();

        if (key.length) {
            Object.assign(result, {
                [key]: getDeclarations(rule.declarations),
            });
        } else {
            Object.assign(result, getDeclarations(rule.declarations));
        }
    });

    return result;
}

function getDeclarations(decs) {
    return decs.reduce((acc, d) => {
        return {
            ...acc,
            [d.property]: d.value,
        };
    }, {});
}
