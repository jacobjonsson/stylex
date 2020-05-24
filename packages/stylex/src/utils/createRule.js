/**
 * Creates a css rule.
 * @param {string} className
 * @param {string} property
 * @param {string} value
 * @param {string} [children]
 * @param {string} [media]
 */
export function createRule(className, property, value, children = '', media) {
    const selector = `.${className} ${children}`.trim();
    const rule = `${selector} { ${property}: ${value}; }`;

    if (media) {
        // We append the className before the rule to make sure they get a higher specificity.
        return `${media} { .${className}${rule} }`;
    }

    return rule;
}
