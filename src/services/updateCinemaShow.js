import instance from './axios'

const CINEMA_SHOWS_URL = '/api/v1/cinema-shows'

export const updateCinemaShow = async (id, data) => {
  const token = JSON.parse(window.localStorage.getItem('token'))

  return await instance.patch(`${CINEMA_SHOWS_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
