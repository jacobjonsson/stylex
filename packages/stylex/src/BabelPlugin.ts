import { NodePath, types } from '@babel/core';
// @ts-ignore
import jsx from '@babel/plugin-syntax-jsx';
import generate from 'babel-generator';
import { StyleSheet } from './StyleSheet';

export function createBabelPlugin(options: {
    stylesheet: StyleSheet;
    theme?: Record<string, any>;
}) {
    const { stylesheet, theme } = options;

    return function babelPlugin(babel: any) {
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
                CallExpression(path: NodePath<types.CallExpression>) {
                    const t = babel.types;
                    if (!('name' in path.node.callee)) {
                        return;
                    }

                    if (path.node.callee.name === 'generateResponsiveStyles') {
                        const propertyNode = path.node.arguments[0] as types.StringLiteral;
                        const property = propertyNode.value;

                        const valuesNode = path.node.arguments[1] as
                            | types.ObjectExpression
                            | types.StringLiteral;

                        let values = {};
                        if (valuesNode.type === 'StringLiteral') {
                            const spaceKey = valuesNode.value;
                            const themeValues = theme[spaceKey];
                            if (!themeValues) {
                                throw new Error(`${spaceKey} is not a valid theme key`);
                            }

                            values = themeValues;
                        } else {
                            valuesNode.properties.forEach((prop) => {
                                if (prop.type !== 'ObjectProperty') {
                                    return;
                                }

                                if (!('value' in prop.value)) {
                                    return;
                                }

                                values = {
                                    ...values,
                                    [prop.key.name]: prop.value.value,
                                };
                            });
                        }

                        const res = stylesheet.generateResponsiveStyles(property, values);
                        const properties = Object.entries(res).map(([key, value]) =>
                            t.objectProperty(t.stringLiteral(key), t.stringLiteral(value)),
                        );
                        path.replaceWith(t.objectExpression(properties));
                    }
                },
            },
        };
    };
}
