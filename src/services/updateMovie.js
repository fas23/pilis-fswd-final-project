import instance from './axios'

const MOVIES_URL = '/api/v1/movies'

export const updateMovie = async (id, data) => {
  const token = JSON.parse(window.localStorage.getItem('token'))

  return await instance.patch(`${MOVIES_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
