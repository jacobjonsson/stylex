/**
 * Fork from https://github.com/sindresorhus/fnv1a
 */

function fnv1a(string) {
    // Handle Unicode code points > 0x7f
    let hash = Number(2166136261n);
    let isUnicoded = false;

    for (let i = 0; i < string.length; i++) {
        let characterCode = string.charCodeAt(i);

        // Non-ASCII characters trigger the Unicode escape logic
        if (characterCode > 0x7f && !isUnicoded) {
            string = unescape(encodeURIComponent(string));
            characterCode = string.charCodeAt(i);
            isUnicoded = true;
        }

        hash ^= characterCode;
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }

    return hash >>> 0;
}

export function createClassName(seed) {
    return 'x' + fnv1a(seed).toString(36);
}
