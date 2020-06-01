const base = require('../../jest.config.base.js');
const pkg = require('./package');

module.exports = {
    ...base,
    rootDir: '../..',
    name: pkg.name,
    displayName: pkg.name,
    preset: 'ts-jest',
    testMatch: [
        '<rootDir>/packages/stylex/src/**/*.test.(tsx|ts|js)',
        '<rootDir>/packages/stylex/src/**/*.test.(tsx|ts|js)',
    ],
};
