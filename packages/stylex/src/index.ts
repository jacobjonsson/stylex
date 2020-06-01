/**
 * @param {TemplateStringsArray} strings
 * @param {...[key: string]: string | number | CSSProperties]} exprs
 */
export function stylex(_: TemplateStringsArray): string {
    throw new Error(
        `Calling the create function during runtime is not allowed. Did you forget to add the webpack plugin?`,
    );
}

/**
 *
 * @param  {...string} classes
 */
export function cx(...classes: Array<string | undefined | null>) {
    return classes.filter(Boolean).join(' ');
}
