import { createClassName } from './createClassName';
import { hyphenate } from './hyphenate';
import { createRule } from './createRule';

const AT_RULE_REGEX = /^@/;

/**
 * Parses a css object into a valid css string.
 */
export function parseCssObj(obj: Record<string, any>, children?: string, media?: string): any[] {
    const rules = [];

    for (const [property, value] of Object.entries(obj)) {
        if (value === null || value === undefined) {
            continue;
        }

        switch (typeof value) {
            case 'object':
                if (AT_RULE_REGEX.test(property)) {
                    rules.push(...parseCssObj(value, children, property));
                } else {
                    rules.push(...parseCssObj(value, children + property.replace(/&/g, ''), media));
                }

                continue;
            case 'number':
            case 'string':
                const className = createClassName(
                    `${property} ${value} ${children} ${media || ''}`,
                );

                const css = createRule(className, hyphenate(property), value, children, media);

                rules.push({ className, css });
        }
    }

    return rules;
}
