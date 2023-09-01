import axios from './axios'
const REGISTER_URL = '/api/v1/auth/signup'

export const register = async (dataRegister) => {
  const { data } = await axios.post(REGISTER_URL, dataRegister)

  return data
}
