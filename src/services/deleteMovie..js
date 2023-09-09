import instance from './axios'

const MOVIES_URL = '/api/v1/movies'

export const deleteMovie = async (id) => {
  const token = JSON.parse(window.localStorage.getItem('token'))

  return await instance.delete(`${MOVIES_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
