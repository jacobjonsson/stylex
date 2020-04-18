import React from "react"
import stylex from "stylex"

const base = stylex.create`
  font-size: 16px;
  background-color: red;
  padding: 20px;
  color: white;
`

export default function Child3() {
  return <div className={stylex.resolve(base)}>Child 1</div>
}
