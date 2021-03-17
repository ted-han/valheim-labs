import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ data, category }) => {
  const order = {
    Food: [
      "item",
      "health",
      "stamina",
      "duration",
      "healing",
      "weight",
      "craft",
    ],
    Mead: ["item", "effects", "duration", "weight", "craft"],
  }
  const itemOrder = order[category]
  return (
    <>
      <table>
        <thead>
          <tr>
            {itemOrder.map((v, i) => (
              <td key={i}>
                {v === "duration"
                  ? v + "(sec)"
                  : v === "healing"
                  ? v + "(hp/tick)"
                  : v}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ node }) => {
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
                  } else if (v === "craft" && node.craft) {
                    return (
                      <td key={i}>
                        {node.craft.map((v, i) => (
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
                  return <td key={i}>{node[v]}</td>
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
