/**
 * @param {TemplateStringsArray} strings
 * @param {...[key: string]: string | number | CSSProperties]}
 */
export function stylex(strings, ...exprs) {
    throw new Error(
        `Calling the create function during runtime is not allowed. Did you forget to add the babel plugin?`,
    );
}

/**
 *
 * @param  {...string} classes
 */
export function cx(...classes) {
    return classes.filter(Boolean).join(' ');
}
