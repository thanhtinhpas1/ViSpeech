import STORAGE from 'utils/storage'
import { JWT_TOKEN, DEFAULT_ERR_MESSAGE } from 'utils/constant'
import apiUrl from './api-url'

export default class ReportService {
  static getUserTotalStatistics = (userId, totalType) => {
    const api = `${apiUrl}/reports/user-total-statistics/${encodeURIComponent(userId)}/${totalType}`
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

  static getAdminTotalStatistics = totalType => {
    const api = `${apiUrl}/reports/admin-total-statistics/${totalType}`
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
