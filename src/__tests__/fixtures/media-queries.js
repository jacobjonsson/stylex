import stylex from "stylex";

const styles = stylex.create({
  root: {
    fontSize: 12,

    "@media (min-width: 768px)": {
      fontSize: 14,
    },
  },
});

export function Component() {
  return <div className={stylex.resolve(styles.root)} />;
}
