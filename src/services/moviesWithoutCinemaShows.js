import instance from './axios'

const IMAGES_URL = '/api/v1/movies/without-cinema-shows'

export const moviesWithoutCinemaShows = async () => {
  const token = JSON.parse(window.localStorage.getItem('token'))

  return await instance.get(IMAGES_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
