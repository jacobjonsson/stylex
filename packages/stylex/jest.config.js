const base = require('../../jest.config.base.js');
const pkg = require('./package');

module.exports = {
    ...base,
    rootDir: '../..',
    name: pkg.name,
    displayName: pkg.name,
    testMatch: [
        '<rootDir>/packages/core/src/**/*.test.(tsx|ts|js)',
        '<rootDir>/packages/core/src/**/*.test.(tsx|ts|js)',
    ],
};
