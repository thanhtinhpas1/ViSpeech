import { useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { ROLES, SORT_ORDER } from './constant'

const numeral = require('numeral')

const Utils = {
  isUser: roleList => {
    return (roleList || []).findIndex(role => [ROLES.USER, ROLES.MANAGER_USER].includes(role.name)) !== -1
  },
  isAdmin: roleList => {
    return (roleList || []).findIndex(role => role.name === ROLES.ADMIN) !== -1
  },
  getRolesInArray: roleList => {
    return (roleList || []).map(role => role.name)
  },
  parameterizeObject: (obj, prefix) => {
    if (!obj) return ''
    const str = []
    Object.keys(obj).forEach(key => {
      if (obj[key] != null) {
        const formatKey = prefix ? `${prefix}[${key}]` : key
        const value = obj[key]
        str.push(
          value != null && typeof value === 'object'
            ? Utils.parameterizeObject(value, formatKey)
            : `${encodeURIComponent(formatKey)}=${encodeURIComponent(value)}`
        )
      }
    })
    if (str.length === 0) return ''
    return `${str.join('&')}`
  },
  parameterizeArray: (key, arr) => {
    if (!arr || arr.length === 0) return ''
    const array = arr.map(encodeURIComponent)
    return `&${key}[]=${array.join(`&${key}[]=`)}`
  },
  trimByChar: (str, char) => {
    return str
      .split(char)
      .filter(ele => ele)
      .join(char)
  },
  removePropertyFromObject: (obj, property) => {
    const result = JSON.parse(JSON.stringify(obj))
    if (typeof obj === 'object' && Object.prototype.hasOwnProperty.call(result, property)) {
      delete result[property]
    }
    return result
  },
  removePropertiesFromObject: (obj, properties) => {
    let result = JSON.parse(JSON.stringify(obj))
    if (typeof obj === 'object' && Array.isArray(properties)) {
      properties.forEach(property => {
        result = Utils.removePropertyFromObject(result, property)
      })
    }
    return result
  },
  sortArr: (arr, sortFunc) => {
    const result = JSON.parse(JSON.stringify(arr))
    return result.sort(sortFunc)
  },
  filter: (arr, filterFunc) => {
    const result = JSON.parse(JSON.stringify(arr))
    return result.filter(filterFunc)
  },
  getSortOrder: sortOrder => {
    let result = sortOrder
    if (sortOrder === 'ascend') {
      result = SORT_ORDER.ASC
    }
    if (sortOrder === 'descend') {
      result = SORT_ORDER.DESC
    }
    return result
  },
  isEmailVerified: roles => {
    return Utils.getRolesInArray(roles).includes(ROLES.MANAGER_USER)
  },
  useQuery: () => {
    return new URLSearchParams(useLocation().search)
  },
  buildFailedMessage: (errorObj, failedAction) => {
    const { code, message } = errorObj || {}
    let errMessage = ''
    if (message) {
      errMessage = message
      if (code === 11000) {
        errMessage = 'Dữ liệu này đã tồn tại.'

        const dupKey = 'dup key: '
        const indexDup = message.indexOf(dupKey)
        if (indexDup >= 0) {
          errMessage = `Đã tồn tại ${message.substr(indexDup + dupKey.length).replace(/[^a-zA-Z0-9@./S]/g, ' ')}`
        }
      }
    }
    // case duplicate
    return failedAction ? `${failedAction}. ${errMessage}` : `${errMessage}`
  },
  buildSortQuery: (sortField, sortOrder) => {
    if (sortField && sortOrder) {
      const sort = {
        field: sortField,
        order: Utils.getSortOrder(sortOrder),
      }
      return `&${Utils.parameterizeObject({ sort })}`
    }
    return ''
  },
  buildFiltersQuery: filters => {
    if (typeof filters === 'object' && Object.keys(filters).length > 0) {
      const formatFilters = {}
      Object.keys(filters).forEach(key => {
        if (Array.isArray(filters[key])) {
          const [filterValue] = filters[key]
          formatFilters[key] = filterValue
        }
      })
      return `&${Utils.parameterizeObject({ filters: formatFilters })}`
    }
    return ''
  },
  sortAndFilterTokenTypeList: (
    list,
    excludedNames,
    sortBy,
    getUpgradeTokenType = false,
    curTokenTypeMinutes = 0,
    sortType = SORT_ORDER.ASC
  ) => {
    const result = [...(list || [])]
    const sortFunc = (a, b) => {
      return sortType === SORT_ORDER.ASC ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
    }
    result.sort(sortFunc)
    if (getUpgradeTokenType) {
      return result.filter(item => !excludedNames.includes(item.name) && item.minutes > curTokenTypeMinutes)
    }
    return result.filter(item => !excludedNames.includes(item.name))
  },
  decodeJwtToken: token => {
    return jwtDecode(token)
  },
  formatPrice: value => {
    return numeral(Number(value || 0) * 1000).format('0,0')
  },
}

export default Utils
