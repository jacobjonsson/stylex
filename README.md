# Goal

A function where you can pass an object with css rules. Each rule should generate an atomic class.
If two components pass the same rule only one class should be created.

Should have first class support for theming and design tokens.

Goal API

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
