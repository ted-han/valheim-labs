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
      <Table data={data} category="food" />
    </Layout>
  )
}

export default FoodPage

export const query = graphql`
  {
    allItems(filter: { category: { eq: "food" } }) {
      edges {
        node {
          id
          name
          category
          data {
            health
            stamina
            duration
            weight
            craft {
              count
              name
            }
          }
        }
      }
    }
  }
`
