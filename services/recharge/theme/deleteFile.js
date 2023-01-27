import client from "../../client.js"

const deleteFile = async (themeId, assetId) => {
  await client.delete(`/portal_theme/${themeId}/assets/${assetId}/delete.json`)
}

export default deleteFile