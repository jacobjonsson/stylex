const minMaxWidth = /(!?\(\s*min(-device-)?-width).+\(\s*max(-device)?-width/i;
const minWidth = /\(\s*min(-device)?-width/i;
const maxMinWidth = /(!?\(\s*max(-device)?-width).+\(\s*min(-device)?-width/i;
const maxWidth = /\(\s*max(-device)?-width/i;

const isMinWidth = testQuery(minMaxWidth, maxMinWidth, minWidth);
const isMaxWidth = testQuery(maxMinWidth, minMaxWidth, maxWidth);

const minMaxHeight = /(!?\(\s*min(-device)?-height).+\(\s*max(-device)?-height/i;
const minHeight = /\(\s*min(-device)?-height/i;
const maxMinHeight = /(!?\(\s*max(-device)?-height).+\(\s*min(-device)?-height/i;
const maxHeight = /\(\s*max(-device)?-height/i;

const isMinHeight = testQuery(minMaxHeight, maxMinHeight, minHeight);
const isMaxHeight = testQuery(maxMinHeight, minMaxHeight, maxHeight);

const isPrint = /print/i;
const isPrintOnly = /^print$/i;

const maxValue = Number.MAX_VALUE;

/**
 * Obtain the length of the media request in pixels.
 * @param {string} length
 * @return {number}
 */
function getQueryLength(length) {
    length = /(-?\d*\.?\d+)(ch|em|ex|px|rem)/.exec(length);

    if (length === null) {
        return maxValue;
    }

    let number = length[1];
    const unit = length[2];

    switch (unit) {
        case 'ch':
            number = parseFloat(number) * 8.8984375;
            break;

        case 'em':
        case 'rem':
            number = parseFloat(number) * 16;
            break;

        case 'ex':
            number = parseFloat(number) * 8.296875;
            break;

        case 'px':
            number = parseFloat(number);
            break;
    }

    return +number;
}

/**
 * Wrapper for creating test functions
 * @private
 * @param {RegExp} doubleTestTrue
 * @param {RegExp} doubleTestFalse
 * @param {RegExp} singleTest
 * @return {Function}
 */
function testQuery(doubleTestTrue, doubleTestFalse, singleTest) {
    /**
     * @param {string} query
     * @return {boolean}
     */
    return function (query) {
        if (doubleTestTrue.test(query)) {
            return true;
        } else if (doubleTestFalse.test(query)) {
            return false;
        }
        return singleTest.test(query);
    };
}

/**
 * @private
 * @param {string} a
 * @param {string} b
 * @return {number|null}
 */
function testIsPrint(a, b) {
    const isPrintA = isPrint.test(a);
    const isPrintOnlyA = isPrintOnly.test(a);

    const isPrintB = isPrint.test(b);
    const isPrintOnlyB = isPrintOnly.test(b);

    if (isPrintA && isPrintB) {
        if (!isPrintOnlyA && isPrintOnlyB) {
            return 1;
        }
        if (isPrintOnlyA && !isPrintOnlyB) {
            return -1;
        }
        return a.localeCompare(b);
    }
    if (isPrintA) {
        return 1;
    }
    if (isPrintB) {
        return -1;
    }

    return null;
}

/**
 * Sorts the media queries with a mobile first approach.
 * @param {string} a
 * @param {string} b
 * @return {number} 1 / 0 / -1
 */
export function sortCSSmq(a, b) {
    const testIsPrint = testIsPrint(a, b);
    if (testIsPrint !== null) {
        return testIsPrint;
    }

    const minA = isMinWidth(a) || isMinHeight(a);
    const maxA = isMaxWidth(a) || isMaxHeight(a);

    const minB = isMinWidth(b) || isMinHeight(b);
    const maxB = isMaxWidth(b) || isMaxHeight(b);

    if (minA && maxB) {
        return -1;
    }
    if (maxA && minB) {
        return 1;
    }

    let lengthA = getQueryLength(a);
    let lengthB = getQueryLength(b);

    if (lengthA === maxValue && lengthB === maxValue) {
        return a.localeCompare(b);
    } else if (lengthA === maxValue) {
        return 1;
    } else if (lengthB === maxValue) {
        return -1;
    }

    if (lengthA > lengthB) {
        if (maxA) {
            return -1;
        }
        return 1;
    }

    if (lengthA < lengthB) {
        if (maxA) {
            return 1;
        }
        return -1;
    }

    return a.localeCompare(b);
}
