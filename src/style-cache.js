export default function StyleCache() {
  /** @type {Record<string, string>} */
  let classes = new Map();

  /** @type {Record<string, any>} */
  let conditionalClassNames = new Map();

  return {
    /**
     * @param {string} className
     */
    addClassName(className) {
      classes.set(className, className);
      conditionalClassNames.delete(className);
    },

    /**
     * @param {string} className
     * @param {any} test
     */
    addConditionalClassName(className, test) {
      if (classes.has(className)) {
        return;
      }

      conditionalClassNames.set(className, { className, test });
    },

    /**
     * @returns
     */
    getClassNames() {
      return Array.from(classes.values());
    },

    /**
     * @returns
     */
    getConditionalClassNames() {
      return Array.from(conditionalClassNames.values());
    },
  };
}
