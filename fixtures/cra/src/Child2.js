import React from "react";
import stylex from "stylex";

const styles = stylex.create({
  root: {
    fontSize: "12px",
    height: "100px",
    width: "200px",
    backgroundColor: "red",
  },
});

function Child2() {
  return <div className={stylex.resolve(styles.root)}>Hello world</div>;
}

export default Child2;
