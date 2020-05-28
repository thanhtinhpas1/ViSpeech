import STORAGE from 'utils/storage'
import { JWT_TOKEN, DEFAULT_ERR_MESSAGE } from 'utils/constant'
import Utils from 'utils'
import { apiUrl } from './api-url'

export default class OrderService {
  static createOrder = (order, paymentIntent) => {
    const api = `${apiUrl}/orders`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({ order, paymentIntent }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then(response => {
        status = response.status
        return response.text()
      })
      .then(result => {
        const resultObj = result ? JSON.parse(result) : {}
        if (status !== 201) {
          throw new Error(resultObj.message || DEFAULT_ERR_MESSAGE)
        }
        return resultObj
      })
      .catch(err => {
        throw new Error(err.message || DEFAULT_ERR_MESSAGE)
      })
  }

  static createPaymentIntent = amount => {
    const api = `${apiUrl}/orders/payment-intent`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({ amount }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(result => {
        if (status !== 201) {
          throw new Error(result.message || DEFAULT_ERR_MESSAGE)
        }
        return result
      })
      .catch(err => {
        throw new Error(err.message || DEFAULT_ERR_MESSAGE)
      })
  }

  static getOrderList = filterConditions => {
    const { pagination, sortField, sortOrder, filters } = filterConditions
    const { current, pageSize } = pagination
    const offset = (current - 1) * pageSize || 0
    const limit = pageSize || 0

    let query = `${Utils.parameterizeObject({ offset, limit })}`
    query += Utils.buildSortQuery(sortField, sortOrder)
    query += Utils.buildFiltersQuery(filters)
    query = Utils.trimByChar(query, '&')

    const api = `${apiUrl}/orders?${query}`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(result => {
        if (status !== 200) {
          throw new Error(result.message || DEFAULT_ERR_MESSAGE)
        }
        return result
      })
      .catch(err => {
        throw new Error(err.message || DEFAULT_ERR_MESSAGE)
      })
  }

  static getUserOrderList = filterConditions => {
    const { userId, pagination, sortField, sortOrder, filters } = filterConditions
    const { current, pageSize } = pagination
    const offset = (current - 1) * pageSize || 0
    const limit = pageSize || 0

    let query = `${Utils.parameterizeObject({ userId, offset, limit })}`
    query += Utils.buildSortQuery(sortField, sortOrder)
    query += Utils.buildFiltersQuery(filters)
    query = Utils.trimByChar(query, '&')

    const api = `${apiUrl}/orders/userId?${query}`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(result => {
        if (status !== 200) {
          throw new Error(result.message || DEFAULT_ERR_MESSAGE)
        }
        return result
      })
      .catch(err => {
        throw new Error(err.message || DEFAULT_ERR_MESSAGE)
      })
  }

  static getOrderInfo = ({ id, tokenId }) => {
    let api = `${apiUrl}/orders/${encodeURIComponent(id)}`
    if (tokenId) {
      api = `${apiUrl}/orders/get-by-token/${encodeURIComponent(tokenId)}`
    }
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(result => {
        if (status !== 200) {
          throw new Error(result.message || DEFAULT_ERR_MESSAGE)
        }
        return result
      })
      .catch(err => {
        throw new Error(err.message || DEFAULT_ERR_MESSAGE)
      })
  }
}
