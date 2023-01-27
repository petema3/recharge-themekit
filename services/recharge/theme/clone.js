import client from "../../client.js"

const clone = async (themeId, themeName) => {

  const postData = {
    theme_name: themeName
  }

  return await client.post(`/portal_theme/${themeId}/clone.json`, postData)
}

export default clone