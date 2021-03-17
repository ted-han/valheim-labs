import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Table from "../components/table"
import SEO from "../components/seo"

const FoodPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Food</h1>
      <Table
        data={data.allItems.edges.filter(
          ({ node }) => node.sub_category === "Food"
        )}
        category="Food"
      />
      <h1>Mead</h1>
      <Table
        data={data.allItems.edges.filter(
          ({ node }) => node.sub_category === "Mead"
        )}
        category="Mead"
      />
    </Layout>
  )
}

export default FoodPage

export const query = graphql`
  {
    allItems(
      sort: { fields: health, order: ASC }
      filter: { category: { eq: "Food" } }
    ) {
      edges {
        node {
          id
          name
          category
          sub_category
          health
          stamina
          duration
          healing
          weight
          effects
          craft {
            count
            name
          }
        }
      }
    }
  }
`
