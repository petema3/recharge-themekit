import client from "../../client.js"

const publish = async (themeId) => {
  return await client.post(`/portal_theme/${themeId}/activate.json`)
}

export default publish