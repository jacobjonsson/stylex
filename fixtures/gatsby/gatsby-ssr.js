/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react")

// You can delete this file if you're not using it
exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()
  headComponents.push(
    <link key="stylex" rel="stylesheet" href="/stylex-bundle.css" />
  )
  replaceHeadComponents(headComponents)
}
