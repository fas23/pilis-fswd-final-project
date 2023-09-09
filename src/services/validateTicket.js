import instance from './axios'

const TICKETS_URL = '/api/v1/tickets'

export const validateTicket = async (data) => {
  const token = JSON.parse(window.localStorage.getItem('token'))

  return await instance.patch(TICKETS_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
