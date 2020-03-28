import STORAGE from 'utils/storage'
import { JWT_TOKEN } from 'utils/constant'
import apiUrl from './api-url'

export default class ProjectService {
  static createProject = ({ name, description, userId }) => {
    const api = `${apiUrl}/projects`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({ name, description, userId }),
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
        if (status !== 201) {
          throw new Error(result.error)
        }
        return result ? JSON.parse(result) : {}
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static getMyProjectList = filterConditions => {
    const { userId, pageIndex, pageSize } = filterConditions
    const offset = pageIndex * pageSize
    const limit = pageSize

    const api =
      pageIndex && pageSize
        ? `${apiUrl}/projects/user-projects?userId=${encodeURIComponent(
            userId
          )}&offset=${offset}&limit=${limit}`
        : `${apiUrl}/projects/user-projects?userId=${encodeURIComponent(userId)}`
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
          throw new Error(result.message)
        }
        return result
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static getAcceptedProjectList = filterConditions => {
    const { userId, pageIndex, pageSize } = filterConditions
    const offset = pageIndex * pageSize
    const limit = pageSize

    const api = `${apiUrl}/projects/accepted-projects?userId=${encodeURIComponent(
      userId
    )}&offset=${offset}&limit=${limit}`
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
          throw new Error(result.message)
        }
        return result
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
