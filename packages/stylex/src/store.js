import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import { sortMQPlugin } from './postcss/sortMQPlugin';
import cssToObj from './utils/cssToObj';
import parse from './utils/parse';

export class Store {
    constructor() {
        this.cache = {};
        this.requests = [];

        this.create = this.create.bind(this);
        this.extractCSS = this.extractCSS.bind(this);
    }

    create(css) {
        const obj = cssToObj(css);
        const rules = parse(obj);
        const locals = [];

        for (const rule of rules) {
            if (!this.cache[rule]) {
                this.cache[rule.className] = rule.css;
            }
            locals.push(rule.className);
        }

        return locals.join(' ');
    }

    addRequest(id) {
        this.requests.push(id);
    }

    getRequests() {
        return this.requests;
    }

    async extractCSS() {
        const cssString = Array.from(Object.values(this.cache)).join('\n');

        return new Promise((resolve, reject) => {
            postcss([sortMQPlugin, autoprefixer({ overrideBrowserslist: '> 0.1%' })])
                .process(cssString, { from: undefined })
                .then((res) => resolve(res.css))
                .catch((err) => reject(err));
        });
    }
}
