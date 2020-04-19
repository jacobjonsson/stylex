const path = require('path');

module.exports = {
    collectCoverageFrom: ['<rootDir>/packages/**/*.js'],
    testPathIgnorePatterns: ['<rootDir>[/\\\\](build|docs|node_modules)[/\\\\]'],
    transform: {
        '^.+\\.js$': path.resolve(__dirname, './jestBabelTransform.js'),
    },
};
