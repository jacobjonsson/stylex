const { StylexPlugin } = require('@jacobjonsson/stylex/dist/webpackPlugin');

module.exports = {
    webpack(config, { isServer }) {
        config.plugins.push(
            new StylexPlugin({
                extract: isServer ? false : 'global',
                globalExtractionFile: '_app',
                extractionDir: 'static',
                babelOptions: {},
            }),
        );

        return config;
    },
};
