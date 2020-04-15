import evaluateSimple from "babel-helper-evaluate-path";
import jsx from "@babel/plugin-syntax-jsx";
import { styleSheet } from "./stylesheet";

function isCreateCall(path) {
  return (
    path.node.callee?.object?.name === "stylex" && path.node.callee?.property?.name === "create"
  );
}

function isResolveCall(path) {
  return (
    path.node.callee?.object?.name === "stylex" && path.node.callee?.property?.name === "resolve"
  );
}

export default function stylexBabelPlugin(babel) {
  return {
    name: "stylex",
    inherits: jsx,
    visitor: {
      CallExpression(path, state) {
        if (!isCreateCall(path)) {
          return;
        }

        const t = babel.types;
        const cloneNode = t.cloneNode || t.cloneDeep;
        const rulesPath = path.get("arguments")[0];
        const properties = rulesPath.get("properties");

        const extractableProperties = [];
        for (const property of properties) {
          if (!property.isObjectProperty()) {
            return;
          }

          let result = evaluateSimple(property.get("value"));
          const className = styleSheet.create(result.value);

          extractableProperties.push(
            t.objectProperty(cloneNode(property.get("key").node), t.stringLiteral(className))
          );

          property.remove();
        }

        const extractedStylesObjectLiteral = t.objectExpression(extractableProperties);

        path.replaceWith(extractedStylesObjectLiteral);
      },

      JSXAttribute(path, state) {
        path.traverse({
          CallExpression(path, state) {
            if (!isResolveCall(path)) {
              return;
            }

            path.get("arguments").forEach((arg) => {
              const res = arg.evaluate();
            });
          },
        });
      },
    },
  };
}
