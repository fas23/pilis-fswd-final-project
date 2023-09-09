import axios from 'axios'
const baseURL = 'https://cinema-api-yutm.onrender.com'
export default axios.create({
  baseURL
})
