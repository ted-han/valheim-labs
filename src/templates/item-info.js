import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Table = ({ data, category }) => {
  const order = {
    Food: ["health", "stamina", "duration", "healing", "weight"],
  }
  return (
    <table>
      <tbody>
        {order[category].map(v => (
          <tr>
            <td>{v === "duration" ? v + "(sec)" : v}</td>
            <td>
              {v === "weight"
                ? data[v]
                : v === "healing"
                ? data[v] + " hp/tick"
                : data[v]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function ItemInfo({ data }) {
  const item = data.items
  let imgName = item.name.replace(/ /gi, "_")

  console.log(imgName)
  console.log(JSON.stringify(item.ingredient))
  return (
    <Layout>
      <Link to={`/${item.category.toLowerCase()}`}>{item.category}</Link>>
      <Link to={`/${item.name.replace(/ /gi, "-")}`}>{item.name}</Link>
      <div style={{ display: "flex", border: "1px solid black" }}>
        <div>
          <h1>{item.name}</h1>
          <p>{item.collected}</p>
          <Table data={item} category={item.category} />
        </div>
        <div>
          <img src={`${imgName}.png`} alt={imgName} />
        </div>
      </div>
      {item.ingredient && (
        <div>
          <h4>Ingredient for</h4>
          {item.ingredient.map(obj => {
            return (
              <div>
                {obj.name} :
                {obj.craft.map(v => (
                  <span>
                    {v.name} x{v.count}
                  </span>
                ))}
              </div>
            )
          })}
        </div>
      )}
      {item.craft.length >= 1 ? (
        <div>
          <h4>Craft</h4>
          {item.craft.map(v => (
            <span>
              {v.name} x{v.count}
            </span>
          ))}
          <span> with {item.with}</span>
        </div>
      ) : (
        ""
      )}
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    items(id: { eq: $id }) {
      id
      category
      collected
      craft {
        count
        name
      }
      duration
      effects
      healing
      health
      ingredient {
        name
        craft {
          count
          name
        }
      }
      name
      stamina
      sub_category
      weight
      with
    }
  }
`
