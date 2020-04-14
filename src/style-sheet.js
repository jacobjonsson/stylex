import parse from "./parse";

export default function StyleSheet() {
  const cache = new Map();

  return {
    create: (styles) => {
      const locals = [];
      const parsedRules = parse(styles);

      parsedRules.forEach((rule) => {
        if (!cache.has(rule.className)) {
          cache.set(rule.className, rule.css);
        }

        locals.push(rule.className);
      });

      return locals.join(" ");
    },

    toString() {
      return Array.from(cache.values()).join("\n");
    },
  };
}
