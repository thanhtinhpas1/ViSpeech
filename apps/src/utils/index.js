import { ROLES } from './constant'

const Utils = {
  checkIfIsUser: roleList => {
    return roleList.findIndex(role => role === ROLES.USER || role === ROLES.MANAGER_USER) !== -1
  },
}

export default Utils
