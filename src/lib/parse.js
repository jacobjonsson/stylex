import hash from './fnv1a';

const hyphenate = (s) => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();

function createClassName(seed) {
  return 'x' + hash(seed).toString(36);
}

const createRule = (className, key, value, children, media) => {
  const selector = `.${className}${children}`;
  const rule = `${selector} {${hyphenate(key)}: ${value};}`;

  if (media) {
    return `${media} {${rule}}`;
  }

  return rule;
};

export default function parse(obj, children = '', media) {
  const rules = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      continue;
    }

    switch (typeof value) {
      case 'object':
        if (/^@/.test(key)) {
          rules.push(...parse(value, children, key));
        } else {
          rules.push(...parse(value, children + key.replace(/&/g, ''), media));
        }

        continue;
      case 'number':
      case 'string':
        const className = createClassName(`${key} ${value} ${children} ${media || ''}`);
        const css = createRule(className, key, value, children, media);
        rules.push({ className, css });
    }
  }

  return rules;
}
