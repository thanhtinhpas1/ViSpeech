import STORAGE from 'utils/storage'
import { JWT_TOKEN } from 'utils/constant'
import apiUrl from './api-url'

export default class PermissionService {
  static sendAssignPermissionEmail = ({ assigneeUsername, projectId, permissions, assignerId }) => {
    const api = `${apiUrl}/permissions/assign-permission`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        assigneeUsername,
        projectId,
        permissions,
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
        if (status !== 201) {
          throw new Error(result.error)
        }
        return result ? JSON.parse(result) : {}
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
