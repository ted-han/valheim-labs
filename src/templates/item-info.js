import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function BlogPost({ data }) {
  const item = data.items
  return (
    <Layout>
      {item.category} > {item.name}
      <br /> image, name, desc, data, collected(biomes), ingredient, crafting
      <div style={{ display: "flex", border: "1px solid black" }}>
        <div>
          <h1>{item.name}</h1>
          <p>{item.desc}</p>
          <p>{item.collected}</p>
          {Object.keys(item.data).map(v => {
            if (v === "craft") return ""
            return (
              <p>
                {v}: {item.data[v]}
              </p>
            )
          })}
        </div>
        <div> image</div>
      </div>
      <p>{item.ingredient}</p>
      <p>{item.craft}</p>
      <p>{item.with}</p>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    items(id: { eq: $id }) {
      with
      name
      desc
      data {
        craft {
          count
          name
        }
        duration
        healing
        health
        stamina
        weight
      }
      craft
      category
    }
  }
`
