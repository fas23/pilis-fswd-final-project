import instance from './axios'

const MOVIES_URL = '/api/v1/movies'

export const uploadMovie = async (data) => {
  const token = JSON.parse(window.localStorage.getItem('token'))

  return await instance.post(MOVIES_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
