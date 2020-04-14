const { RawSource } = require("webpack-sources");
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const bundleFilenamePath = "stylex-bundle.css";
export default class StylexPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("Stylex", (compilation) => {
      const css = readFileSync(join(__dirname, "stylex.cache.css")).toString();
      compilation.assets[bundleFilenamePath] = new RawSource(css);
    });
  }
}
