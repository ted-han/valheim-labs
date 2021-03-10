import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function BlogPost({ data }) {
  const item = data.items
  return (
    <Layout>
      <div>
        <h1>{item.id}</h1>
        <h1>{item.name}</h1>
        <h1>{item.category}</h1>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    items(id: { eq: $id }) {
      id
      name
      category
    }
  }
`
