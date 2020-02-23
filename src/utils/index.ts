import { CONSTANTS } from "common/constant";

const bcrypt = require("bcryptjs");
const uuid = require("uuid");

export const Utils = {
  hashPassword: password => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  },
  getUuid: () => {
    return uuid();
  },
  comparePassword: (oldPassword, newPassword) => {
    return bcrypt.compare(oldPassword, newPassword);
  },
  updateUserRoles: roles => {
    if (!roles) {
      return [CONSTANTS.ROLE.USER];
    }
    if (typeof roles === "string") {
      return [roles];
    }
    return roles;
  }
};
