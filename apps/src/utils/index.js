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
}

export default Utils
