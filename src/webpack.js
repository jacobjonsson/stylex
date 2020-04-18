import { styleSheet } from './stylesheet';

const bundleFilenamePath = 'stylex-bundle.css';
export default class StylexPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('Stylex', (compilation, callback) => {
      const css = styleSheet.extractCSS();
      compilation.assets[bundleFilenamePath] = {
        source: function () {
          return css;
        },
        size: function () {
          return css.length;
        },
      };

      callback();
    });
  }
}
