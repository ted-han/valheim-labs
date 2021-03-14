const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allItems {
        edges {
          node {
            id
            name
            category
          }
        }
      }
    }
  `)

  result.data.allItems.edges.forEach(({ node }) => {
    createPage({
      path: `${node.name.replace(/ /gi, "-")}`,
      component: path.resolve(`./src/templates/item-info.js`),
      context: {
        id: node.id,
      },
    })
  })
}
