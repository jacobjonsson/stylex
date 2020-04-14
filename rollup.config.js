import fs from "fs";
import path from "path";
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

fs.rmdirSync(path.join(__dirname, "dist"), { recursive: true });

export default [
  {
    input: "src/babel.js",
    external: [
      "babel-helper-evaluate-path",
      "@babel/plugin-syntax-jsx",
      "@babel/helper-module-imports",
      "fs",
      "path",
    ],
    output: {
      file: "dist/babel.js",
      format: "cjs",
    },
    plugins: [babel({ exclude: "node_modules/**" }), resolve(), commonjs()],
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/index.js",
      format: "esm",
    },
    plugins: [babel({ exclude: "node_modules/**" }), resolve()],
  },
  {
    input: "src/webpack.js",
    output: {
      file: "dist/webpack.js",
      format: "cjs",
    },
    plugins: [babel({ exclude: "node_modules/**" }), resolve()],
  },
];
