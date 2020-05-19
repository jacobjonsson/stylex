import jsx from '@babel/plugin-syntax-jsx';
import generate from 'babel-generator';
import loadConfig from './utils/loadConfig';

export function createBabelPlugin(options) {
    const { store } = options;

    return function babelPlugin(babel) {
        const theme = loadConfig().theme;

        return {
            name: 'stylex',
            inherits: jsx,
            visitor: {
                TaggedTemplateExpression(path) {
                    let t = babel.types;
                    let { quasi, tag } = path.node;

                    if (tag.name !== 'stylex') {
                        return;
                    }

                    let cssText = '';
                    let expressions = path.get('quasi').get('expressions');

                    quasi.quasis.forEach((el, i) => {
                        cssText += el.value.cooked;
                        let expression = expressions[i];

                        if (t.isArrowFunctionExpression(expression)) {
                            const { code } = generate(expression.node);

                            // Execute the stringified function from the css
                            const value = new Function(`return ${code}`)()(theme);
                            cssText += value;
                        }
                    });

                    const className = store.create(cssText);
                    path.replaceWith(t.stringLiteral(className));
                },
            },
        };
    };
}
