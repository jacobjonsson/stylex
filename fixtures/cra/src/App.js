import React from "react";
import stylex from "stylex";
import Child1 from "./Child1";
import Child2 from "./Child2";
import Child3 from "./Child3";

const styles = stylex.create({
  root: {
    fontSize: 12,
    height: 100,
    width: 200,
    backgroundColor: "red",
  },
});

function App() {
  return (
    <div className={stylex.resolve(styles.root)}>
      <Child1 />
      <Child2 />
      <Child3 />
    </div>
  );
}

export default App;
