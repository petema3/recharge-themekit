import client from "../../client.js"

const deleteTheme = async (themeId) => {
  return await client.delete(`/portal_theme/${themeId}/delete.json`)
}

export default deleteTheme