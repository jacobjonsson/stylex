# Stylex

Themable CSS in JS with no runtime. All styles are extracted during compile time.

```jsx
import { stylex, cx } from '@jacobjonsson/stylex';

const base = stylex`
    margin-bottom: ${(theme) => theme.spacing.small};
    margin-top: ${(theme) => theme.spacing.small};
    background-color: ${(theme) => theme.colors.red};
`;

const blue = stylex`
    background-color: ${(theme) => theme.colors.blue};
`;

function Button(props) {
    return <button className={cx(base, props.blue && blue)}>{props.children}</button>;
}
```

## Getting started

Stylex works by extracting styles using a webpack loader.

### Gatsby

Install stylex and the stylex gatsby plugin.

```sh
yarn add @jacobjonsson/stylex @jacobjonsson/gatsby-plugin-stylex
```

Add the gatsby plugin to `gatsby-config.js`.

```javascript
// gatsby.config.js

module.exports = {
    ...,
    `@jacobjonsson/gatsby-plugin-stylex`,
    ....
};
```

## Task list

-   [x] Static extraction using webpack loader
-   [ ] Support for theme functions inside css
