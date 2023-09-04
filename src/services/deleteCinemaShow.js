import instance from './axios'

const CINEMA_SHOWS_URL = '/api/v1/cinema-shows'

export const deleteCinemaShow = async (id) => {
  const token = JSON.parse(window.localStorage.getItem('token'))

  return await instance.delete(`${CINEMA_SHOWS_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
