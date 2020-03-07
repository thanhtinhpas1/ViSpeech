import apiUrl from './api-url'

export default class OrderService {
  static createOrder = ({ userId, tokenTypeId }) => {
    const api = `${apiUrl}/orders`
    let status = 400
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({ userId, tokenTypeId }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(result => {
        if (status !== 201) {
          throw new Error(result.error)
        }
        return result
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static createPaymentIntent = amount => {
    const api = `${apiUrl}/orders/payment-intent`
    let status = 400
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({ amount }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(result => {
        if (status !== 201) {
          throw new Error(result.error)
        }
        return result
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
