import STORAGE from 'utils/storage'
import { JWT_TOKEN, DEFAULT_ERR_MESSAGE } from 'utils/constant'
import Utils from 'utils'
import { apiUrl } from './api-url'

export default class RequestService {
  static getRequestList = filterConditions => {
    const { pagination, sortField, sortOrder, filters } = filterConditions
    const { current, pageSize } = pagination
    const offset = (current - 1) * pageSize || 0
    const limit = pageSize || 0

    let query = `${Utils.parameterizeObject({ offset, limit })}`
    query += Utils.buildSortQuery(sortField, sortOrder)
    query += Utils.buildFiltersQuery(filters)
    query = Utils.trimByChar(query, '&')

    const api = `${apiUrl}/requests?${query}`
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
          throw new Error(DEFAULT_ERR_MESSAGE)
        }
        return result
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }

  static getRequestListByUserId = (userId, filterConditions) => {
    const { pagination, sortField, sortOrder, filters } = filterConditions
    const { current, pageSize } = pagination
    const offset = (current - 1) * pageSize || 0
    const limit = pageSize || 0

    let query = `${Utils.parameterizeObject({ offset, limit })}`
    query += Utils.buildSortQuery(sortField, sortOrder)
    query += Utils.buildFiltersQuery(filters)
    query = Utils.trimByChar(query, '&')

    const api = `${apiUrl}/requests/userId/${userId}?${query}`
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
          throw new Error(DEFAULT_ERR_MESSAGE)
        }
        return result
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }

  static getRequestInfo = async id => {
    const api = `${apiUrl}/requests/${id}`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
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
          throw new Error(DEFAULT_ERR_MESSAGE)
        }
        return result
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }

  static updateRequest = (id, transcriptFileUrl) => {
    const api = `${apiUrl}/requests/transcriptFileUrl/${id}`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'PUT',
      body: JSON.stringify({ transcriptFileUrl }),
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
        if (status !== 200) {
          throw new Error(resultObj.message || DEFAULT_ERR_MESSAGE)
        }
        return resultObj
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }

  static downloadTranscript = (html, id) => {
    const api = `${apiUrl}/requests/download-transcript/${id}`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({ html }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then(response => {
        status = response.status
        return response.blob()
      })
      .then(result => {
        if (status !== 201) {
          throw new Error(DEFAULT_ERR_MESSAGE)
        }
        return result
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }
}
