import { rmdirSync } from 'fs';
import { join } from 'path';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

rmdirSync(join(__dirname, 'dist'), { recursive: true });

export default [
    {
        input: {
            babel: 'src/babel-plugin.js',
            loader: 'src/loader.js',
        },
        external: [
            '@babel/plugin-syntax-jsx',
            'css',
            'stylis',
            'loader-utils',
            '@babel/core',
            'path',
            'fs',
            'mkdirp',
            'babel-generator',
        ],
        output: {
            dir: 'dist',
            format: 'cjs',
        },
        plugins: [babel({ exclude: 'node_modules/**' }), resolve(), commonjs()],
    },
    {
        input: 'src/index.js',
        output: {
            file: 'dist/index.js',
            format: 'esm',
        },
        plugins: [babel({ exclude: 'node_modules/**' }), resolve()],
    },
];
