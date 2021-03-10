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

  snapshot.forEach(doc => {
    console.log(doc.id, "=>", doc.data())
    createNode({
      ...doc.data(),
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

  return
}