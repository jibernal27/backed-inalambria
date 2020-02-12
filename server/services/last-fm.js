import axios from 'axios'

const API_ROOT = 'http://ws.audioscrobbler.com/2.0/'

const getRequest = async (method, params) => {
  const request = await axios.get(API_ROOT, {
    params: {
      format: 'json',
      api_key: process.env.LAST_FM_API_KEY,
      method,
      ...params
    }
  })
  return request.data
}

export const searchSong = async query => {
  return getRequest('track.search', { track: query })
}
