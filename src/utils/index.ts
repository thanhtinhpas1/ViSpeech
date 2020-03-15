import {CONSTANTS} from 'common/constant';
import {v1 as uuidv1} from 'uuid';

const bcrypt = require('bcryptjs');

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
  removeNullOrEmptyPropertyOfObj: obj => {
    const result = JSON.parse(JSON.stringify(obj));
    if (typeof (obj) === 'object') {
      Object.keys(result).forEach(property => {
        if (result[property] == null || result[property] === "") {
          delete result[property];
        }
      })
    }
    return result;
  },
  removePropertyFromObject: (obj, property) => {
    const result = JSON.parse(JSON.stringify(obj));
    if (typeof (obj) === 'object' && result.hasOwnProperty(property)) {
      delete result[property];
    }
    return result;
  },
  removePropertiesFromObject: (obj, properties) => {
    let result = JSON.parse(JSON.stringify(obj));
    if (typeof (obj) === 'object' && Array.isArray(properties)) {
      properties.forEach(property => {
        result = Utils.removePropertyFromObject(result, property);
      })
    }
    return result;
  },
  removeObjPropertiesFromObjArr: (arr, properties) => {
    const result = [];
    if (Array.isArray(arr) && Array.isArray(properties)) {
      arr.forEach(obj => {
        const updatedObj = Utils.removePropertiesFromObject(obj, properties);
        result.push(updatedObj);
      })
    }
    return result;
  }
};
