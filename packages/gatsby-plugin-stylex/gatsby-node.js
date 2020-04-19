exports.onCreateWebpackConfig = ({ actions, rules }) => {
    const stylexLoader = {
        loader: '@jacobjonsson/stylex/dist/loader',
        options: {
            babelOptions: {
                presets: ['babel-preset-gatsby'],
            },
        },
    };

    const jsRules = {
        ...rules.js(),
        use: [...rules.js().use, stylexLoader],
    };

    actions.setWebpackConfig({
        module: {
            rules: [jsRules],
        },
    });
};
