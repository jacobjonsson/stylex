import { transformCSSString } from './lib/transformCSSString';
import { generateResponsiveStyles } from './lib/generateResponsiveStyles';

export class StyleSheet {
    ruleCache: Map<string, string>;
    requestCache: Set<string>;

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
     */
    addCSS(css: string) {
        const rules = transformCSSString(css);
        const locals = [];

        for (const rule of rules) {
            if (!this.ruleCache.has(rule.className)) {
                this.ruleCache.set(rule.className, rule.css);
            }

            locals.push(rule.className);
        }

        return locals.join(' ');
    }

    generateResponsiveStyles(property: string, values: Record<string, string | number>) {
        const { rules, styleRefs } = generateResponsiveStyles(property, values);

        for (const rule of rules) {
            if (!this.ruleCache.has(rule.className)) {
                this.ruleCache.set(rule.className, rule.css);
            }
        }

        return styleRefs;
    }

    /**
     * Adds a file to the internal request array.
     * When emitting the css file, it will be added as a dependency for all the files in the request array.
     * @param {string} file
     */
    addCSSRequest(file: string) {
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
