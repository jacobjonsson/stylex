# Goal

A function where you can pass an object with css rules. Each rule should generate an atomic class.
If two components pass the same rule only one class should be created.

Should have first class support for theming and design tokens.

Goal API

```jsx
const styles = stylex.create(({ spacing, colors, ...etc }) => ({
  base: {
    marginBottom: spacing.small,
    marginTop: spacing.large,
    backgroundColor: colors.gray,
  },
  blue: {
    backgroundColor: colors.blue,
  },
}));

function Button({ blue, children }) {
  return (
    <button className={stylex(styles.base, blue && styles.blue)}>
      {children}
    </button>
  );
}
```
