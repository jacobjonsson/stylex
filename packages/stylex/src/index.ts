export function stylex(_: TemplateStringsArray): string {
    throw new Error(
        `Calling the stylex function during runtime is not allowed. Did you forget to add the webpack plugin?`,
    );
}

export function cx(...classes: Array<string | undefined | null>) {
    return classes.filter(Boolean).join(' ');
}

export function generateResponsiveStyles(property: string, values: Record<string, string>) {
    throw new Error(
        `Calling the generateResponsiveStyles function during runtime is not allowed. Did you forget to add the webpack plugin?`,
    );
}

export function resolveResponsiveClass(
    styleRefs: Record<string, string>,
    value: string | [string] | [string, string] | [string, string, string],
) {
    if (typeof value === 'string') {
        return styleRefs[value];
    }

    if (value.length === 1) {
        const [sm] = value;
        return styleRefs[sm];
    }

    if (value.length === 2) {
        const [sm, md] = value;
        return `${styleRefs[sm]} ${styleRefs[`md:${md}`]}`;
    }

    if (value.length === 3) {
        const [sm, md, lg] = value;
        return `${styleRefs[sm]} ${styleRefs[`md:${md}`]} ${styleRefs[`lg:${lg}`]}`;
    }

    throw new Error(`${value} is a valid responsive prop`);
}
