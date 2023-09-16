import axios from './axios'
const PAYMENT_URL = '/api/v1/payments/create-order'

export const createOrder = async (dataPayment) => {
  const token = JSON.parse(window.localStorage.getItem('token'))
  const { data } = await axios.post(PAYMENT_URL, { items: dataPayment }, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return data
}
