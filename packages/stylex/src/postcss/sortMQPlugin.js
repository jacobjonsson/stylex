import postcss from 'postcss';
import { sortCSSmq } from './sortCssMediaQueries';

export const sortMQPlugin = postcss.plugin('postcss-sort-media-queries', () => {
    return (root) => {
        let atRules = {};

        root.walkAtRules('media', (atRule) => {
            let query = atRule.params;

            if (!atRules[query]) {
                atRules[query] = postcss.atRule({
                    name: atRule.name,
                    params: atRule.params,
                });
            }

            atRule.nodes.forEach((node) => {
                atRules[query].append(node.clone());
            });

            atRule.remove();
        });

        Object.keys(atRules)
            .sort(sortCSSmq)
            .forEach((query) => {
                root.append(atRules[query]);
            });
    };
});
