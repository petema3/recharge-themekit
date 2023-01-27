import client from "../../client.js"

const newFile = async (themeId, filename, source = '') => {
  
  const postData = {
    filename,
    source
  }

  return await client.post(`/portal_theme/${themeId}/assets`, postData)
}

export default newFile