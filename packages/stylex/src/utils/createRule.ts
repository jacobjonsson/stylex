export function createRule({
    className,
    property,
    value,
    children = '',
    media,
}: {
    className: string;
    property: string;
    value: string | number;
    children?: string;
    media?: string;
}) {
    // TODO: We need to be smarter about how we attach the nested selectors.
    // We need to insert a space if children is a tag (button)
    const selector = createSelector({ className, children });
    const rule = `${selector} { ${property}: ${value}; }`;

    if (media) {
        // We append the className before the rule to make sure they get a higher specificity.
        return `${media} { .${className}${rule} }`;
    }

    return rule;
}

function createSelector({ className, children }: { className: string; children?: string }) {
    if (!children) {
        return `.${className}`;
    }

    if (/^:/.test(children)) {
        return `.${className}${children}`;
    }

    return `.${className} ${children}`;
}
