import client from "../../client.js"

const getFile = async (themeId, assetId) => {
  return await client.get(`portal_theme/${themeId}/assets/${assetId}/raw`)
}

export default getFile