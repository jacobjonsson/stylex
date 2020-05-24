/**
 * Hyphenates a string.
 * @param {string} string
 */
export function hyphenate(string) {
    return string.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();
}
