const admin = require("firebase-admin")
const serviceAccount = require("./firebase.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
const db = admin.firestore()

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  const collectionName = "items"
  const snapshot = await db.collection(collectionName).get()

  // 어디에 사용되는 재료인지 확인
  let ingredient = {}
  snapshot.forEach(doc => {
    for (let v of doc.data().craft) {
      ingredient[v.name]
        ? ingredient[v.name].push({
            name: doc.data().name,
            craft: doc.data().craft,
          })
        : (ingredient[v.name] = [
            { name: doc.data().name, craft: doc.data().craft },
          ])
    }
  })

  snapshot.forEach(doc => {
    // console.log(doc.id, "=>", doc.data())
    createNode({
      ...doc.data(),
      ingredient: ingredient[doc.data().name],
      id: doc.id,
      parent: null,
      children: [],
      internal: {
        type: collectionName,
        content: JSON.stringify(doc.data()),
        contentDigest: createContentDigest(doc.data()),
      },
    })
  })

  createNode({
    id: "tk",
    namd: "tk",
    parent: null,
    children: [],
    internal: {
      type: "tk",
      content: JSON.stringify({}),
      contentDigest: createContentDigest({}),
    },
  })

  return
}
