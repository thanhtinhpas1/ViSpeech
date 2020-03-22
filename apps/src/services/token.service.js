import STORAGE from 'utils/storage'
import { JWT_TOKEN } from 'utils/constant'
import apiUrl from './api-url'

export default class TokenService {
  static getTokenList = filterConditions => {
    const { userId, pageIndex, pageSize } = filterConditions
    const offset = pageIndex * pageSize
    const limit = pageSize

    const api = `${apiUrl}/tokens/userId?userId=${encodeURIComponent(
      userId
    )}&offset=${offset}&limit=${limit}`
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
          throw new Error(result.message)
        }
        return result
      })
      .catch(err => {
        throw new Error(err)
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
          throw new Error(result.message)
        }
        return result
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
