import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  console.log(data.allItems)
  return (
    <Layout>
      <SEO title="Home" />
      <StaticImage
        src="../images/main.png"
        width={300}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
      <div>
        <input type="search" name="search" value="" placeholder="search item" />
      </div>
      <p>
        <Link to="/food">Food</Link> <br />
        <Link to="/food">Weapons</Link> <br />
        <Link to="/food">Armor</Link> <br />
        <Link to="/food">etc</Link> <br />
      </p>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allItems {
      distinct(field: category)
    }
  }
`
