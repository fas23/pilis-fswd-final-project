import axios from './axios'
const PAYMENT_URL = '/api/v1/payments'

export const payment= async (dataPayment) => {
    const token=JSON.parse(window.localStorage.getItem('token'))
    console.log('tocken',token)
  const { data } = await axios.post(PAYMENT_URL, {items:dataPayment},{
    headers:{
        Authorization:'Bearer '+ token
    }
  })
  return data
}