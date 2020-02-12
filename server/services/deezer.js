import axios from 'axios'

const API_ROOT = 'https://api.deezer.com/'
const LIMIT = 30

const getRequest = async (uri, params) => {
  const request = await axios.get(`${API_ROOT}${uri}`, {
    params: {
      access_token: process.env.DEEZER_ACCESS_TOKEN,
      ...params
    }
  })
  return request.data
}

export const getSong = async track => {
  return getRequest(`track/${track}`)
}

export const searchTracks = async (query, page = 1) => {
  const index = (page - 1) * LIMIT
  const res = await getRequest('search', {
    q: `track:"${query}"`,
    index,
    limit: LIMIT,
    access_token: null
  })
  res.limit = LIMIT
  return res
}
