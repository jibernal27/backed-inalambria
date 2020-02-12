import axios from 'axios'

const API_ROOT = 'https://api.deezer.com/'

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
