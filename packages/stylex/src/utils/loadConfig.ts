import fs from 'fs';
import path from 'path';

const configFilename = 'stylex.config.js';

export default function loadConfig() {
    const configPath = path.join(process.cwd(), configFilename);
    if (fs.existsSync(configPath)) {
        const source = fs.readFileSync(configPath).toString();
        const config = processConfig(source);
        return config;
    } else {
        throw new Error('No stylex.config.js was found');
    }
}

function processConfig(source: string) {
    const code = `return ${source.replace('module.exports =', '').replace('export default', '')}`;
    const fn = new Function(code);
    return fn();
}
