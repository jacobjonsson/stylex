import cssToObj from './css-to-obj';
import parse from './parse';

function StyleSheet() {
    let styleCache = new Map();

    /**
     * Parses and stores the css.
     * @param {string} css The unparsed css text.
     */
    function create(css) {
        let obj = cssToObj(css);
        let rules = parse(obj);
        let locals = [];

        for (let rule of rules) {
            if (!styleCache.has(rule)) {
                styleCache.set(rule.className, rule.css);
            }
            locals.push(rule.className);
        }

        return locals.join(' ');
    }

    /**
     * Returns an array of css rules.
     * @returns {string[]}
     */
    function extractCSS() {
        return Array.from(styleCache.values());
    }

    return {
        create,
        extractCSS,
    };
}

let styleSheet = StyleSheet();
export default styleSheet;
