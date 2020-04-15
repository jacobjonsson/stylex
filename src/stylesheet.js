import parse from "./parse";

class StyleSheet {
  constructor() {
    this.cache = new Map();
  }

  create(styles) {
    const locals = [];
    const parsedRules = parse(styles);

    parsedRules.forEach((rule) => {
      if (!this.cache.has(rule.className)) {
        this.cache.set(rule.className, rule.css);
      }

      locals.push(rule.className);
    });

    return locals.join(" ");
  }

  extractCSS() {
    return Array.from(this.cache.values()).join("\n").trim();
  }
}

export let styleSheet = new StyleSheet();
