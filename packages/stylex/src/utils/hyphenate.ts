/**
 * Hyphenates a string.
 */
export function hyphenate(string: string) {
    return string.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();
}
