import axios from './axios'
const MOVIES_URL = '/api/v1/movies'

export const movie = async (dataMovie) => {
  const { data } = await axios.get(MOVIES_URL, dataMovie)

  return data
}
