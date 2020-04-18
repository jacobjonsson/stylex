import parse from './lib/parse';

function StyleSheet() {
  let cache = new Map();

  return {
    /**
     * @param {Record<string, string | object>} styles
     * @returns {string[]}
     */
    create(styles) {
      let locals = [];
      let parsedRules = parse(styles);

      parsedRules.forEach((rule) => {
        if (!cache.has(rule.className)) {
          cache.set(rule.className, rule.css);
        }

        locals.push(rule.className);
      });

      return locals;
    },

    /**
     * @returns {string}
     */
    extractCSS() {
      return Array.from(cache.values()).join('\n').trim();
    },
  };
}

export let styleSheet = new StyleSheet();
