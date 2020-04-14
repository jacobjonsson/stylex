export default function StyleCache() {
  const styles = new Map();
  const conditionalStyles = new Map();

  return {
    addStyle(key, value) {
      styles.set(key, value);
      conditionalStyles.set(key, value);
    },

    addConditionalStyle(key, value) {
      const current = styles.has(key)
        ? styles.get(key)
        : conditionalStyles.has(key)
        ? conditionalStyles.get(key)
        : "";
      styles.delete(key);
      conditionalStyles.set(key, {
        test,
        consequent: value,
        alternate: current,
      });
    },

    getStyles() {
      return Array.from(styles.values());
    },

    getConditionalStyles() {
      return Array.from(conditionalStyles.values());
    },
  };
}
