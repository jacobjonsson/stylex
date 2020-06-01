import { NodePath, types } from '@babel/core';
// @ts-ignore
import jsx from '@babel/plugin-syntax-jsx';
import generate from 'babel-generator';
import loadConfig from './utils/loadConfig';

export function createBabelPlugin(options: Record<string, any>) {
    const { stylesheet } = options;

    return function babelPlugin(babel: any) {
        const theme = loadConfig().theme;

        return {
            name: 'stylex',
            inherits: jsx,
            visitor: {
                TaggedTemplateExpression(path: NodePath<types.TaggedTemplateExpression>) {
                    const t = babel.types;
                    const { quasi, tag } = path.node;

                    if (!('name' in tag) || tag.name !== 'stylex') {
                        return;
                    }

                    let cssText = '';
                    const expressions = path.get('quasi').get('expressions');

                    quasi.quasis.forEach((el, i) => {
                        cssText += el.value.cooked;
                        let expression = expressions[i];

                        if (t.isArrowFunctionExpression(expression)) {
                            // @ts-ignore
                            const { code } = generate(expression.node);

                            // Execute the stringified function from the css
                            const value = new Function(`return ${code}`)()(theme);
                            cssText += value;
                        }
                    });

                    const className = stylesheet.addCSS(cssText);
                    path.replaceWith(t.stringLiteral(className));
                },
            },
        };
    };
}
