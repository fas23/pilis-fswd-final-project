import axios from './axios'
const LOGIN_URL = '/api/v1/auth/login'

export const login = async (dataLogin) => {
  const { data } = await axios.post(LOGIN_URL, dataLogin)

  return data
}
