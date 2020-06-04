import fs from 'fs';
import path from 'path';

const configFilename = 'stylex.config.js';

export default function loadConfig() {
    const configPath = path.join(process.cwd(), configFilename);
    if (fs.existsSync(configPath)) {
        return require(configPath);
    } else {
        throw new Error('No stylex.config.js was found');
    }
}
