import STORAGE from 'utils/storage'
import { JWT_TOKEN, DEFAULT_ERR_MESSAGE } from 'utils/constant'
import Utils from 'utils'
import { apiUrl } from './api-url'

export default class TokenService {
  static getTokenList = filterConditions => {
    const { pagination, sortField, sortOrder, filters } = filterConditions
    const { current, pageSize } = pagination
    const offset = (current - 1) * pageSize || 0
    const limit = pageSize || 0

    let query = `${Utils.parameterizeObject({ offset, limit })}`
    query += Utils.buildSortQuery(sortField, sortOrder)
    query += Utils.buildFiltersQuery(filters)
    query = Utils.trimByChar(query, '&')

    const api = `${apiUrl}/tokens?${query}`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
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

  static getUserTokenList = filterConditions => {
    const { userId, pageIndex, pageSize } = filterConditions
    const offset = pageIndex * pageSize
    const limit = pageSize

    const api =
      pageIndex != null && pageSize != null
        ? `${apiUrl}/tokens/user-tokens?userId=${encodeURIComponent(userId)}&offset=${offset}&limit=${limit}`
        : `${apiUrl}/tokens/user-tokens?userId=${encodeURIComponent(userId)}`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
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

  static getFreeToken = userId => {
    const api = `${apiUrl}/tokens/free-token/${encodeURIComponent(userId)}`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
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

  static getProjectTokenList = filterConditions => {
    const { userId, projectId, pagination, sortField, sortOrder, filters } = filterConditions
    const { current, pageSize } = pagination
    const offset = (current - 1) * pageSize || 0
    const limit = pageSize || 0

    let query = `${Utils.parameterizeObject({ userId, projectId, offset, limit })}`
    query += Utils.buildSortQuery(sortField, sortOrder)
    query += Utils.buildFiltersQuery(filters)
    query = Utils.trimByChar(query, '&')

    const api = `${apiUrl}/tokens/project-tokens?${query}`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
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

  static getTokenTypeList = () => {
    const api = `${apiUrl}/tokens/token-types`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
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

  static deleteToken = id => {
    const api = `${apiUrl}/tokens/${id}`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'DELETE',
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
        throw new Error(err.message || DEFAULT_ERR_MESSAGE)
      })
  }
}
