import instance from './axios'

const HALLS_URL = '/api/v1/rooms'

export const getHalls = async () => {
  const token = JSON.parse(window.localStorage.getItem('token'))

  return await instance.get(HALLS_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
