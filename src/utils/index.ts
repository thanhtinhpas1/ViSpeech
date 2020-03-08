import { CONSTANTS } from "common/constant";
import { v1 as uuidv1 } from "uuid";

const bcrypt = require("bcryptjs");

export const Utils = {
  hashPassword: password => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  },
  getUuid: () => {
    return uuidv1();
  },
  comparePassword: (oldPassword, newPassword) => {
    return bcrypt.compare(oldPassword, newPassword);
  },
  formatUserRoles: roles => {
    if (!roles || !Array.isArray(roles)) {
      return [{ name: CONSTANTS.ROLE.USER }];
    }
    return roles;
  },
  removeNullOrEmptyPropertyOfObj: obj => {
    let result = JSON.parse(JSON.stringify(obj));
    if (typeof(result) === 'object') {
      Object.keys(result).forEach(property => {
        if (result[property] == null || result[property] === "") {
          delete result[property];
        }
      })
    }
    return result;
  }
};
