import path from "path";
import { transformFileSync } from "@babel/core";
import plugin from "../babel";

function transpile(file) {
  return transformFileSync(path.resolve(__dirname, file), {
    plugins: [plugin],
    babelrc: false,
  });
}

it.each([["simple.js"], ["media-queries.js"], ["nested-selectors.js"]])("%s", (file) => {
  const { code, metadata } = transpile(`./fixtures/${file}`);
  expect(code).toMatchSnapshot();
  expect(metadata).toMatchSnapshot();
});
