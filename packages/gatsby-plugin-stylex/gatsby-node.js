const { StylexPlugin } = require('@jacobjonsson/stylex/dist/webpackPlugin');

exports.onCreateWebpackConfig = ({ rules, actions, getConfig, stage }) => {
    actions.setWebpackConfig({
        plugins: [
            new StylexPlugin({
                babelOptions: {
                    presets: ['babel-preset-gatsby'],
                },
            }),
        ],
    });
};
