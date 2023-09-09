import instance from './axios'

const CINEMA_SHOWS_URL = '/api/v1/cinema-shows'

export const uploadCinemaShow = async (data) => {
  const token = JSON.parse(window.localStorage.getItem('token'))

  return await instance.post(CINEMA_SHOWS_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
