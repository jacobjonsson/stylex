import React from "react"
import stylex from "stylex"

const styles = stylex.create({
  root: {
    fontSize: "16px",
    backgroundColor: "red",
    padding: "20px",
    color: "white",
  },
})

export default function Child1() {
  return <div className={stylex.resolve(styles.root)}>Child 1</div>
}
