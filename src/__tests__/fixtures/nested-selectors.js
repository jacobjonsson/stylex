import stylex from "stylex";

const styles = stylex.create({
  root: {
    fontSize: 12,

    "& > p": {
      color: "white",
    },
  },
});

export function Component() {
  return <div className={stylex.resolve(styles.root)} />;
}
