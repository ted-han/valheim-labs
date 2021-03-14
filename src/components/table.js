import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ data, category }) => {
  const order = {
    food: ["item", "health", "stamina", "duration", "weight", "craft"],
  }
  const itemOrder = order[category]
  return (
    <>
      <table>
        <thead>
          <tr>
            {itemOrder.map((v, i) => (
              <td key={i}>{v}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.allItems.edges.map(({ node }) => {
            return (
              <tr key={node.id}>
                {itemOrder.map((v, i) => {
                  if (v === "item") {
                    let imgName = node.name.replace(/ /gi, "_")
                    return (
                      <td key={i}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={`${imgName}.png`}
                            alt={imgName}
                            height="50px"
                          />
                          <Link to={`/${node.name.replace(/ /gi, "-")}`}>
                            {node.name}
                          </Link>
                        </div>
                      </td>
                    )
                  } else if (v === "craft" && node.data.craft) {
                    return (
                      <td key={i}>
                        {node.data.craft.map((v, i) => (
                          <Link to={`/${v.name.replace(/ /gi, "-")}`}>
                            <span key={i}>
                              <img
                                src={`${v.name}.png`}
                                alt={v.name}
                                height="50px"
                              />
                              x{v.count}
                            </span>
                          </Link>
                        ))}
                      </td>
                    )
                  }
                  return <td key={i}>{node.data[v]}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Layout
