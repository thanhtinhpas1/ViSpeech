import STORAGE from '../utils/storage'
import { JWT_TOKEN, DEFAULT_ERR_MESSAGE } from '../utils/constant'
import { apiUrl } from './api-url'

export default class PermissionService {
  static sendAssignPermissionEmail = ({ assigneeUsernames, projectId, expiresIn, assignerId }) => {
    const api = `${apiUrl}/permissions/assign-permission`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        assigneeUsernames,
        projectId,
        expiresIn,
        assignerId,
      }),
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
        console.log(err.message)
      })
  }

  static replyPermissionAssign = ({ emailToken, status }) => {
    const api = `${apiUrl}/permissions/reply-permission-assign`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let httpStatus = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({ emailToken, status }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then(response => {
        httpStatus = response.status
        return response.text()
      })
      .then(result => {
        const resultObj = result ? JSON.parse(result) : {}
        if (httpStatus !== 201) {
          throw new Error(resultObj.message || DEFAULT_ERR_MESSAGE)
        }
        return resultObj
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }

  static findPermissionByEmailToken = token => {
    const api = `${apiUrl}/permissions/email-token/${token}`
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

  static updatePermissionExpirationDate = (projectId, assignerId, assigneeId, expiresIn) => {
    const api = `${apiUrl}/permissions/update-expiration-date`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'PUT',
      body: JSON.stringify({
        expiresIn,
        assigneePermission: {
          projectId,
          assignerId,
          assigneeId,
        },
      }),
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

  static deletePermissionForAssignee = (projectId, assignerId, assigneeId) => {
    const api = `${apiUrl}/permissions/delete-permission-for-assignee`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'DELETE',
      body: JSON.stringify({
        projectId,
        assignerId,
        assigneeId,
      }),
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
}
