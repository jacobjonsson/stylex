import jsx from '@babel/plugin-syntax-jsx';
import cssToObj from './lib/cssToObj';
import parse from './lib/parse';

const ruleCache = new Map();

function createStyles(styles) {
    const locals = [];
    const parsedRules = parse(styles);

    parsedRules.forEach((rule) => {
        if (!ruleCache.has(rule.className)) {
            ruleCache.set(rule.className, rule.css);
        }

        locals.push(rule.className);
    });

    return locals;
}

export default function stylexBabelPlugin(babel) {
    return {
        name: 'stylex',
        inherits: jsx,
        visitor: {
            Program: {
                exit(path, state) {
                    state.file.metadata = {
                        stylex: {
                            css: Array.from(ruleCache.values()),
                        },
                    };
                },
            },
            TaggedTemplateExpression(path, state) {
                let t = babel.types;
                let { quasi, tag } = path.node;

                if (!isCreateTag(tag)) {
                    return;
                }

                let cssText = '';
                let expressions = path.get('quasi').get('expressions');

                quasi.quasis.forEach((el, i) => {
                    let expression = expressions[i];

                    // No expression, save the string as the value.
                    if (!expression) {
                        cssText += el.value.cooked;
                    }
                });

                let css = cssToObj(cssText);
                let className = createStyles(css).join(' ');
                path.replaceWith(t.stringLiteral(className));
            },
        },
    };
}

function isCreateTag(tag) {
    return tag.name === 'stylex';
}
