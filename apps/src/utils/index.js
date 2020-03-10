import { ROLES } from './constant'

const Utils = {
  checkIfIsUser: roleList => {
    return (
      roleList.findIndex(
        role =>
          role.name === ROLES.USER ||
          role.name === ROLES.MANAGER_USER ||
          role.name === ROLES.CSR_USER
      ) !== -1
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
    const rolesInArray = []
    roleList.forEach(role => {
      rolesInArray.push(role.name)
    })
    return rolesInArray
  },
  formatRolesToSubmit: roleList => {
    const roles = []
    roleList.forEach(role => {
      if (role.isSelected) roles.push({ name: role.name })
    })
    return roles
  },
}

export default Utils
