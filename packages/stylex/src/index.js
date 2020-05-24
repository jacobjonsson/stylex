/**
 * @param {TemplateStringsArray} strings
 * @param {...[key: string]: string | number | CSSProperties]} exprs
 */
export function stylex(strings, ...exprs) {
    throw new Error(
        `Calling the create function during runtime is not allowed. Did you forget to add the webpack plugin?`,
    );
}

/**
 *
 * @param  {...string} classes
 */
export function cx(...classes) {
    return classes.filter(Boolean).join(' ');
}
