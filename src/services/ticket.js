import axios from './axios'
const TICKETS_URL = '/api/v1/tickets'

export const ticket = async () => {
    console.log('llegó')
  const token=window.localStorage.getItem('token')
  console.log('tocken',token)
  const { data } = await axios.get(TICKETS_URL, {
    headers:{
        Authorization:'Bearer '+ token
    }})
    console.log('ticket Data',data)
  return data
}