// Fork of https://github.com/jxnblk/css-to-object/
// which is MIT (c) jxnblk
import { parse } from 'css';
import stylis from 'stylis';

const SEL = '_';
const SELRE = new RegExp('^' + SEL);

export default function cssToObj(css) {
  const wrapped = stylis(SEL, css);
  const ast = parse(wrapped);
  return transform(ast.stylesheet.rules);
}

function transform(rules, result = {}) {
  rules.forEach((rule) => {
    if (rule.type === 'media') {
      const key = '@media ' + rule.media;
      const decs = transform(rule.rules);
      result[key] = decs;
      return;
    }

    const [selector] = rule.selectors;
    const key = selector.replace(SELRE, '').trim();

    if (key.length) {
      Object.assign(result, {
        [key]: getDeclarations(rule.declarations),
      });
    } else {
      Object.assign(result, getDeclarations(rule.declarations));
    }
  });
  return result;
}

function getDeclarations(decs) {
  return decs
    .map((d) => ({
      key: d.property,
      value: d.value,
    }))
    .reduce((a, b) => {
      a[b.key] = b.value;
      return a;
    }, {});
}
