import STORAGE from 'utils/storage'
import { JWT_TOKEN, DEFAULT_ERR_MESSAGE } from 'utils/constant'
import Utils from 'utils'
import apiUrl from './api-url'

export default class ReportService {
  static getStatisticsById = (id, statisticsType, timeType, queryParams) => {
    const { fromDate, toDate, weekObj, monthObj, quarterObj, fromYear, toYear } = queryParams
    let query = `${Utils.parameterizeObject({ fromDate, toDate })}&${Utils.parameterizeObject({
      weekObj,
    })}&${Utils.parameterizeObject({ monthObj })}&${Utils.parameterizeObject({
      quarterObj,
    })}&${Utils.parameterizeObject({ fromYear, toYear })}`
    query = Utils.trimByChar(query, '&')

    const api = `${apiUrl}/reports/statistics-by-id/${encodeURIComponent(
      id
    )}/${statisticsType}/${timeType}?${query}`
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

  static getUserTokenTypeStatistics = (id, userId, timeType, queryParams) => {
    const { fromDate, toDate, weekObj, monthObj, quarterObj, fromYear, toYear } = queryParams
    let query = `${Utils.parameterizeObject({ fromDate, toDate })}&${Utils.parameterizeObject({
      weekObj,
    })}&${Utils.parameterizeObject({ monthObj })}&${Utils.parameterizeObject({
      quarterObj,
    })}&${Utils.parameterizeObject({ fromYear, toYear })}`
    query = Utils.trimByChar(query, '&')

    const api = `${apiUrl}/reports/user-token-type-statistics/${encodeURIComponent(
      id
    )}/${encodeURIComponent(userId)}/${timeType}?${query}`
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

  static getUserTotalStatistics = (userId, statisticsType, timeType, queryParams) => {
    const { fromDate, toDate, weekObj, monthObj, quarterObj, fromYear, toYear } = queryParams
    let query = `${Utils.parameterizeObject({ fromDate, toDate })}&${Utils.parameterizeObject({
      weekObj,
    })}&${Utils.parameterizeObject({ monthObj })}&${Utils.parameterizeObject({
      quarterObj,
    })}&${Utils.parameterizeObject({ fromYear, toYear })}`
    query = Utils.trimByChar(query, '&')

    const api = `${apiUrl}/reports/user-total-statistics/${encodeURIComponent(
      userId
    )}/${statisticsType}/${timeType}?${query}`
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

  static getAdminTotalStatistics = (statisticsType, timeType, queryParams) => {
    const { fromDate, toDate, weekObj, monthObj, quarterObj, fromYear, toYear } = queryParams
    let query = `${Utils.parameterizeObject({ fromDate, toDate })}&${Utils.parameterizeObject({
      weekObj,
    })}&${Utils.parameterizeObject({ monthObj })}&${Utils.parameterizeObject({
      quarterObj,
    })}&${Utils.parameterizeObject({ fromYear, toYear })}`
    query = Utils.trimByChar(query, '&')

    const api = `${apiUrl}/reports/admin-total-statistics/${statisticsType}/${timeType}?${query}`
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
