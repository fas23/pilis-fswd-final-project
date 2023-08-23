import axios from './axios'
const LOGIN_URL = '/api/v1/auth/login'
const login = async ({ email, password }) => {
  const { data } = await axios.post(LOGIN_URL, JSON.stringify({ email, password }),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return data
}

export default { login }
