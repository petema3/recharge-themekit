import client from '../../client.js'

const editFile = async (themeId, assetId, source = '') => {

  const postData = {
    skip_validation: 1,
    source
  }

  return await client.post(`/portal_theme/${themeId}/assets/${assetId}/edit.json`, postData)
}

export default editFile