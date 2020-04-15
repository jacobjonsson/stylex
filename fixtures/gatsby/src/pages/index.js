import React from "react"
import stylex from "stylex"
import Child1 from "../components/Child1"
import Child2 from "../components/Child2"
import Child3 from "../components/Child3"
import Child4 from "../components/Child4"

const styles = stylex.create({
  heading: {
    fontSize: "20px",
    backgroundColor: "red",
    padding: "30px",
  },

  p: {
    fontSize: "20px",
    color: "red",
    padding: "20px",
    backgroundColor: "red",
  },
})

const IndexPage = () => (
  <React.Fragment>
    <h1 className={stylex.resolve(styles.heading)}>Hi people</h1>
    <p className={stylex.resolve(styles.p)}>Hi people</p>

    <Child1 />
    <Child2 />
    <Child3 />
    <Child4 />
  </React.Fragment>
)

export default IndexPage
