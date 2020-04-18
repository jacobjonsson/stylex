import React from "react"
import stylex from "stylex"
import Child1 from "../components/Child1"
import Child2 from "../components/Child2"
import Child3 from "../components/Child3"
import Child4 from "../components/Child4"

const heading = stylex.create`
  background-color: red;
  font-size: 100px;

  @media (min-width: 768px) {
    background-color: yellow;
  }
`

const blue = stylex.create`
  background-color: blue;

  @media (min-width: 768px) {
    background-color: green;
  }
`

const IndexPage = () => {
  const [isBlue, setIsBlue] = React.useState(false)

  return (
    <React.Fragment>
      <h1 className={stylex.resolve(heading, isBlue && blue)}>Hi people</h1>
      <button onClick={() => setIsBlue(!isBlue)}>Toggle blue class</button>

      <Child1 />
      <Child2 />
      <Child3 />
      <Child4 />
    </React.Fragment>
  )
}

export default IndexPage
