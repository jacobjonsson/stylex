/**
 * Creates a css rule.
 */
export function createRule(
    className: string,
    property: string,
    value: string | number,
    children: string = '',
    media?: string,
) {
    const selector = `.${className} ${children}`.trim();
    const rule = `${selector} { ${property}: ${value}; }`;

    if (media) {
        // We append the className before the rule to make sure they get a higher specificity.
        return `${media} { .${className}${rule} }`;
    }

    return rule;
}
