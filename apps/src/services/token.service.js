import apiUrl from './api-url'

export default class TokenService {
  static getTokens = userId => {
    const api = `${apiUrl}/tokens/userId?userId=${userId}`
    let status = 400
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
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

  static getTokenTypes = () => {
    const api = `${apiUrl}/tokens/token-types`
    let status = 400
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
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
