const { StylexPlugin } = require('@jacobjonsson/stylex/dist/WebpackPlugin');

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        plugins: [
            new StylexPlugin({
                extract: 'module',
                babelOptions: {
                    presets: ['babel-preset-gatsby'],
                },
            }),
        ],
    });
};
