import jsx from '@babel/plugin-syntax-jsx';
import { styleSheet } from './stylesheet';
import cssToObj from './lib/cssToObj';
import StyleCache from './style-cache';

export default function stylexBabelPlugin(babel) {
  return {
    name: 'stylex',
    inherits: jsx,
    visitor: {
      Program: {
        exit(path, state) {
          path.traverse({
            TaggedTemplateExpression(path, state) {
              if (!isCreateTag(tag)) {
                return;
              }

              console.log(path);
            },
          });
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
        let classNames = styleSheet.create(css);
        path.replaceWith(
          t.arrayExpression(classNames.map((className) => t.stringLiteral(className))),
        );
      },
      CallExpression(path, state) {
        let t = babel.types;
        if (!isResolveCall(path)) {
          return;
        }

        let styleCache = new StyleCache();

        path.get('arguments').forEach((arg, i) => {
          let res = arg.evaluate();
          if (res.confident) {
            res.value.forEach((value) => styleCache.addClassName(value));
            return;
          }

          if (arg.type === 'LogicalExpression') {
            if (arg.node.operator !== '&&')
              throw arg.buildCodeFrameError(
                `Styles argument does not support the ${arg.node.operator} operator with dynamic values.`,
              );
            let left = path.get(`arguments.${i}.left`);
            let right = path.get(`arguments.${i}.right`);

            let valueRight = right.evaluate();

            if (!valueRight.confident)
              throw arg.buildCodeFrameError(
                `Styles argument only accepts boolean expressions in the form "{condition} && {css}".`,
              );

            valueRight.value.forEach((value) =>
              styleCache.addConditionalClassName(valueRight.value, left.node),
            );
          }
        });

        let expressions = styleCache.getConditionalClassNames();
        let literals = styleCache.getClassNames();

        // We have not classes, so let's just add an empty string to not mess up external classes.
        if (!expressions.length && !literals) {
          path.replaceWith(t.stringLiteral(''));
          return;
        }

        // We have no expressions, let's just add static classes.
        if (!expressions.length) {
          path.replaceWith(t.stringLiteral(literals.join(' ')));
          return;
        }

        let concat = (left, right) => t.binaryExpression('+', left, right);

        let exps = expressions.reduce(
          (acc, { test, className }) => {
            let node = t.conditionalExpression(
              test,
              t.stringLiteral(className.join(' ')),
              t.stringLiteral(''),
            );

            return acc.type === 'NullLiteral'
              ? node
              : concat(concat(acc, t.stringLiteral(' ')), node);
          },
          !literals ? t.nullLiteral() : t.stringLiteral(literals.join(' ')),
        );

        path.replaceWith(exps);
      },
    },
  };
}

function isResolveCall(path) {
  return (
    path.node.callee?.object?.name === 'stylex' && path.node.callee?.property?.name === 'resolve'
  );
}

function isCreateTag(tag) {
  return tag.object.name === 'stylex' && tag.property.name === 'create';
}
