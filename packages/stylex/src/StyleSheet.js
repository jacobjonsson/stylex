import { cssToObj } from './utils/cssToObj';
import { parseCssObj } from './utils/parseCssObj';

export class StyleSheet {
    constructor() {
        /**
         * The internal rule cache.
         * @type {Map<string, string>}
         */
        this.ruleCache = new Map();

        /**
         * Files that have requested the css as a dependency.
         * @type {Set<string>}
         */
        this.requestCache = new Set();
    }

    /**
     * Adds css to the style sheet.
     * Returns the a string of classes representing the styles.
     * @param {string} css
     * @returns
     */
    addCSS(css) {
        const obj = cssToObj(css);
        const rules = parseCssObj(obj);
        const locals = [];

        for (const rule of rules) {
            if (!this.ruleCache.has(rule)) {
                this.ruleCache.set(rule.className, rule.css);
            }

            locals.push(rule.className);
        }

        return locals.join(' ');
    }

    /**
     * Adds a file to the internal request array.
     * When emitting the css file, it will be added as a dependency for all the files in the request array.
     * @param {string} file
     */
    addCSSRequest(file) {
        this.requestCache.add(file);
    }

    /**
     * Returns an array of the request cache.
     */
    getRequests() {
        return Array.from(this.requestCache);
    }

    /**
     * Extracts the internal css into a css string.
     */
    async extractCSS() {
        return Array.from(this.ruleCache.values()).join('\n');
    }
}
