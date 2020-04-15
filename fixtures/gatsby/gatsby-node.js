/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const Stylex = require("stylex/dist/webpack")

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  console.log(stage)
  let config = {}
  switch (stage) {
    case "build-html":
    case "build-javascript":
    case "develop":
      config = {
        plugins: [new Stylex()],
      }
      break

    default:
      break
  }

  actions.setWebpackConfig(config)
}
