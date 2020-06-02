import postcss from 'postcss';
import postcssNested from 'postcss-nested';
import { StylexRule } from '../types';
import { createClassName } from '../utils/createClassName';
import { createRule } from '../utils/createRule';

const SEL = '_';

/**
 * Transforms a css string into an array of stylex rules.
 * @param css
 */
export function transformCSSString(css: string): StylexRule[] {
    const rules: StylexRule[] = [];

    postcss([postcssNested, makePostCSSPlugin(rules)]).process(`${SEL} {${css}}`).css;

    return rules;
}

function makePostCSSPlugin(rules: StylexRule[]) {
    return function postCSSPlugin(root: postcss.Root) {
        interface Decl {
            media?: string;
            selector: string;
            prop: string;
            value: string;
        }

        const responsiveDecls: Decl[] = [];
        const decls: Decl[] = [];

        // Walk all the media rules and remove them after saving
        root.walkAtRules((atRule) => {
            atRule.walkDecls((decl) => {
                responsiveDecls.push({
                    media: `@${atRule.name} ${atRule.params}`,
                    selector: (decl.parent as postcss.Rule).selector,
                    prop: decl.prop,
                    value: decl.value,
                });
            });

            atRule.remove();
        });

        root.walkRules((rule) => {
            if (!('selector' in rule)) {
                return;
            }

            rule.walkDecls((decl) => {
                decls.push({ selector: rule.selector, prop: decl.prop, value: decl.value });
            });

            rule.remove();
        });

        if (root.nodes.length > 0) {
            console.error('Some nodes in the css was not able to be processed.');
        }

        [...decls, ...responsiveDecls].forEach((decl) => {
            const children = decl.selector.replace(new RegExp(`^${SEL}`), '');

            const className = createClassName(
                `${decl.prop} ${decl.value} ${children} ${decl.media || ''}`,
            );

            const rule = createRule({
                className,
                property: decl.prop,
                value: decl.value,
                children,
                media: decl.media,
            });

            rules.push({
                className,
                css: rule,
            });
        });
    };
}
