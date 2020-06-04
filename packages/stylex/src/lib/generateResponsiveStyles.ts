import { createClassName } from '../utils/createClassName';
import { createRule } from '../utils/createRule';
import { StylexRule } from '../types';

// TODO: These values should preferably be read from the theme.
const mdBreakpoint = '768px';
const lgBreakpoint = '1024px';

export function generateResponsiveStyles(
    property: string,
    values: Record<string, string | number>,
) {
    const styleRefs: Record<string, string> = {};

    const smRules: StylexRule[] = [];
    const mdRules: StylexRule[] = [];
    const lgRules: StylexRule[] = [];

    for (const [key, value] of Object.entries(values)) {
        const smClassName = createClassName(`${property} ${value}`);
        const mdClassName = createClassName(
            `${property} ${value} @media (min-width: ${mdBreakpoint})`,
        );
        const lgClassName = createClassName(
            `${property} ${value} @media (min-width: ${lgBreakpoint})`,
        );

        styleRefs[key] = smClassName;
        styleRefs[`md:${key}`] = mdClassName;
        styleRefs[`lg:${key}`] = lgClassName;

        const smRule = createRule({
            className: smClassName,
            property,
            value,
        });
        const mdRule = createRule({
            className: mdClassName,
            property,
            value,
            media: `@media (min-width: ${mdBreakpoint})`,
        });
        const lgRule = createRule({
            className: lgClassName,
            property,
            value,
            media: `@media (min-width: ${lgBreakpoint})`,
        });

        smRules.push({ css: smRule, className: smClassName });
        mdRules.push({ css: mdRule, className: mdClassName });
        lgRules.push({ css: lgRule, className: lgClassName });
    }

    return {
        styleRefs,
        rules: [...smRules, ...mdRules, ...lgRules],
    };
}
