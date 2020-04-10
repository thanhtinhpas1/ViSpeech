import { useLocation } from 'react-router-dom'
import { ROLES } from './constant'

const Utils = {
  checkIfIsUser: roleList => {
    return (
      roleList.findIndex(role => role.name === ROLES.USER || role.name === ROLES.MANAGER_USER) !==
      -1
    )
  },
  getRolesInText: roleList => {
    let rolesInText = ''
    roleList.forEach(role => {
      rolesInText += `${role.name}, `
    })
    rolesInText = rolesInText.slice(0, rolesInText.lastIndexOf(','))
    return rolesInText.trim()
  },
  getRolesInArray: roleList => {
    return roleList.map(role => role.name)
  },
  formatRolesToSubmit: roleList => {
    const roles = []
    roleList.forEach(role => {
      if (role.isSelected) roles.push({ name: role.name })
    })
    return roles
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
  sortAndFilter: (arr, sortFunc, filterFunc) => {
    const result = JSON.parse(JSON.stringify(arr))
    const a = result.sort(sortFunc)
    return a.filter(filterFunc).map(item => item)
  },
  isEmailVerified: roles => {
    return Utils.getRolesInArray(roles).indexOf(ROLES.MANAGER_USER) !== -1
  },
  useQuery: () => {
    return new URLSearchParams(useLocation().search)
  },
}

export default Utils
