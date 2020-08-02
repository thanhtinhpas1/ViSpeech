import STORAGE from '../utils/storage'
import { DEFAULT_ERR_MESSAGE, JWT_TOKEN, USER_TYPE, DEFAULT_PAGINATION } from '../utils/constant'
import Utils from '../utils'
import { apiUrl } from './api-url'

export default class UserService {
  static login = ({ username, password }) => {
    const api = `${apiUrl}/login`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
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
          if (status === 401) {
            const msg = 'Tên tài khoản hoặc mật khẩu chưa đúng.'
            throw new Error(msg)
          } else {
            throw new Error(DEFAULT_ERR_MESSAGE)
          }
        }
        STORAGE.setPreferences(JWT_TOKEN, result.jwtToken)
        return result
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(err.message || DEFAULT_ERR_MESSAGE)
      })
  }

  static loginWithSocial = (accessToken, userType) => {
    if (!Utils.isSocialAccount(userType)) {
      throw new Error('Loại người dùng không hợp lệ.')
    }
    const api = userType === USER_TYPE.FACEBOOK ? `${apiUrl}/login-facebook` : `${apiUrl}/login-google`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        access_token: accessToken,
      }),
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
          throw new Error(DEFAULT_ERR_MESSAGE)
        }
        return result
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }

  static register = ({ username, email, lastName, firstName, password, roles }) => {
    const api = `${apiUrl}/users`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        lastName,
        firstName,
        password,
        roles,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        status = response.status
        return response.text()
      })
      .then(result => {
        const resultObj = result ? JSON.parse(result) : {}
        if (status !== 201) {
          throw new Error()
        }
        return resultObj
      })
      .catch(err => {
        console.log(err.message)
        const msg = 'Thông tin đăng ký chưa chính xác, vui lòng thử lại.'
        throw new Error(msg)
      })
  }

  static authenticate = token => {
    const api = `${apiUrl}/authenticate`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(result => {
        if (status !== 200) {
          STORAGE.removePreferences(JWT_TOKEN)
          throw new Error(DEFAULT_ERR_MESSAGE)
        }
        return result
      })
      .catch(err => {
        STORAGE.removePreferences(JWT_TOKEN)
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }

  static getUserList = filterConditions => {
    const { pagination, sortField, sortOrder, filters } = filterConditions
    const { current, pageSize } = pagination || DEFAULT_PAGINATION.SIZE_100
    const offset = (current - 1) * pageSize || 0
    const limit = pageSize || 0

    let query = `${Utils.parameterizeObject({ offset, limit })}`
    query += Utils.buildSortQuery(sortField, sortOrder)
    query += Utils.buildFiltersQuery(filters)
    query = Utils.trimByChar(query, '&')

    const api = `${apiUrl}/users?${query}`
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

  static getUsernameList = filterConditions => {
    const { pagination, sortField, sortOrder, filters } = filterConditions
    const { current, pageSize } = pagination || DEFAULT_PAGINATION.SIZE_100
    const offset = (current - 1) * pageSize || 0
    const limit = pageSize || 0

    let query = `${Utils.parameterizeObject({ offset, limit })}`
    query += Utils.buildSortQuery(sortField, sortOrder)
    query += Utils.buildFiltersQuery(filters)
    query = Utils.trimByChar(query, '&')

    const api = `${apiUrl}/users/usernames?${query}`
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

  static getUserInfo = id => {
    const api = `${apiUrl}/users/${id}`
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

  static updateUserInfo = (id, info) => {
    const api = `${apiUrl}/users/${id}`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'PUT',
      body: JSON.stringify({
        ...info,
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
          throw new Error()
        }
        return resultObj
      })
      .catch(err => {
        console.log(err.message)
        const msg = 'Thông tin cập nhật không hợp lệ.'
        throw new Error(msg)
      })
  }

  static createUser = data => {
    const api = `${apiUrl}/users`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)
    let status = 400
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
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
          throw new Error()
        }
        return resultObj
      })
      .catch(err => {
        console.log(err.message)
        const msg = 'Thông tin người dùng chưa hợp lệ, vui lòng thử lại.'
        throw new Error(msg)
      })
  }

  static deleteUser = id => {
    const api = `${apiUrl}/users/${id}`
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
          throw new Error(DEFAULT_ERR_MESSAGE)
        }
        return resultObj
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }

  static sendVerifyEmail = userId => {
    const api = `${apiUrl}/users/send-verify-email`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        _id: userId,
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
          throw new Error(DEFAULT_ERR_MESSAGE)
        }
        return resultObj
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }

  static verifyEmail = emailToken => {
    const api = `${apiUrl}/users/verify-email`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({ emailToken }),
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
          throw new Error(DEFAULT_ERR_MESSAGE)
        }
        return resultObj
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }

  static getProjectAssignees = projectId => {
    const api = `${apiUrl}/users/assignees/${projectId}`
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

  static sendEmailResetPassword = email => {
    const api = `${apiUrl}/user/send-email-reset-password`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        status = response.status
        return response.text()
      })
      .then(result => {
        const resultObj = result ? JSON.parse(result) : {}
        if (status !== 200) {
          throw new Error(DEFAULT_ERR_MESSAGE)
        }
        return resultObj
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }

  static resetPassword = ({ password, userId }) => {
    const api = `${apiUrl}/user/reset-password`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        password,
        userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        status = response.status
        return response.text()
      })
      .then(result => {
        const resultObj = result ? JSON.parse(result) : {}
        if (status !== 200) {
          throw new Error(DEFAULT_ERR_MESSAGE)
        }
        return resultObj
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }

  static changePassword = ({ userId, oldPassword, newPassword }) => {
    const api = `${apiUrl}/users/change-password`
    const jwtToken = STORAGE.getPreferences(JWT_TOKEN)

    let status = 400
    return fetch(api, {
      method: 'PUT',
      body: JSON.stringify({
        userId,
        oldPassword,
        newPassword,
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
          throw new Error(DEFAULT_ERR_MESSAGE)
        }
        return resultObj
      })
      .catch(err => {
        console.log(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }

  // static updateAvatar = ({ avatar, token }) => {
  //   const api = `${apiUrl}/user/update-avatar`
  //   let status = 400
  //   // eslint-disable-next-line no-undef
  //   return fetch(api, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       avatar,
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then(response => {
  //       status = response.status
  //       return response.json()
  //     })
  //     .then(result => {
  //       if (status !== 200) {
  //         throw new Error(result.message)
  //       }
  //       return result
  //     })
  //     .catch(err => {
  //       throw err
  //     })
  // }
}
