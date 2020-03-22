import apiUrl from './api-url'

export default class ContractService {
  static parameterizeObject = (obj, prefix) => {
    if (!obj) return ''
    const str = []
    Object.keys(obj).forEach(key => {
      if (obj[key]) {
        const formarKey = prefix ? `${prefix}[${key}]` : key
        const value = obj[key]
        str.push(
          value !== null && typeof value === 'object'
            ? this.parameterizeObject(value, formarKey)
            : `${encodeURIComponent(formarKey)}=${encodeURIComponent(value)}`
        )
      }
    })
    if (str.length === 0) return ''
    return `${str.join('&')}`
  }

  // static parameterizeObject = (obj, prefix) => {
  //   if (!obj) return ''
  //   const str = []
  //   Object.keys(obj).forEach(key => {
  //     if (obj[key]) {
  //       const formarKey = prefix ? `${prefix}[${key}]` : key
  //       const value = obj[key]
  //       str.push(
  //         value !== null && typeof value === 'object'
  //           ? this.parameterizeObject(value, formarKey)
  //           : `${encodeURIComponent(formarKey)}=${encodeURIComponent(value)}`
  //       )
  //     }
  //   })
  //   if (str.length === 0) return ''
  //   return `${str.join('&')}`
  // }

  // static parameterizeArray = (key, arr) => {
  //   if (!arr || arr.length === 0) return ''
  //   const array = arr.map(encodeURIComponent)
  //   return `&${key}[]=${array.join(`&${key}[]=`)}`
  // }

  static getContractList = filterConditions => {
    const { userId } = filterConditions
    const page = filterConditions.currentPage
    const limit = filterConditions.currentLimit
    const contractType = filterConditions.currentStatus

    const query = `&${this.parameterizeObject({
      status: contractType,
    })}`

    const api = `${apiUrl}/contract?userId=${encodeURIComponent(
      userId
    )}&page=${page}&limit=${limit}${query}`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
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
        return result.contract
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static countContracts = filterConditions => {
    const { userId } = filterConditions
    const contractType = filterConditions.currentStatus

    const query = `&${this.parameterizeObject({
      status: contractType,
    })}`
    const api = `${apiUrl}/contract/quantity?userId=${encodeURIComponent(userId)}${query}`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
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
        return result.contract
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static getContractListForTeacherPage = filterConditions => {
    const { userId } = filterConditions
    const page = filterConditions.currentPage
    const limit = filterConditions.currentLimit

    const api = `${apiUrl}/contract/list-for-teacher?userId=${encodeURIComponent(
      userId
    )}&page=${page}&limit=${limit}`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
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
        return result.payload
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static countContractsForTeacherPage = filterConditions => {
    const { userId } = filterConditions

    const api = `${apiUrl}/contract/quantity-for-teacher?userId=${encodeURIComponent(userId)}`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
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
        return result.payload
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  /**
   * get contract detail
   * input: {id contract, token}
   */
  static getContract = ({ id, token }) => {
    const api = `${apiUrl}/contract/get-detail/${id}`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
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
        return result.payload
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static createContract = contract => {
    const api = `${apiUrl}/contract/create`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify(contract),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
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
        return result.contract
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  /**
   * Student report contract
   */
  static reportContract = ({ contractId, content, token }) => {
    const api = `${apiUrl}/contract/report`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        contractId,
        content,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
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
        throw new Error(err.message)
      })
  }

  /**
   * Teacher approve contract
   * input: {contractId, token as token of teacher}
   */
  static approveContract = ({ contractId, token }) => {
    const api = `${apiUrl}/contract/approve/${contractId}`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
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
        throw new Error(err.message)
      })
  }

  /**
   * Teacher or student finish contract
   * input: {contractId, token as token of teacher, comment: {content, rating}}
   */
  static finishContract = ({ contractId, token, comment }) => {
    console.log('comment: ', comment)
    const api = `${apiUrl}/contract/finish`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'PUT',
      body: JSON.stringify({
        contractId,
        comment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
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
        throw new Error(err.message)
      })
  }

  /**
   * Student comment and rate contract
   * input: {content, ratings, id as contractId, token as token of student}
   */
  static updateRatingContract = ({ content, ratings, id, token }) => {
    const api = `${apiUrl}/contract/update-rating/`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'PUT',
      body: JSON.stringify({
        content,
        ratings,
        id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
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
        throw new Error(err.message)
      })
  }

  static onPayment = ({ contractId, amount, stripeToken, token }) => {
    console.log('on payment')
    const api = `${apiUrl}/contract/charge/`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({ contractId, stripeToken, amount }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
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
        throw new Error(err.message)
      })
  }
}
