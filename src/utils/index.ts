import { v1 as uuidv1 } from 'uuid';
import { CONSTANTS } from '../common/constant';
import { Double } from 'typeorm';

const bcrypt = require('bcryptjs');

export const Utils = {
    hashPassword: password => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    getUuid: () => {
        return uuidv1();
    },
    comparePassword: (plainTextPassword, hashedPassword) => {
        return bcrypt.compare(plainTextPassword, hashedPassword);
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
            });
        }
        return result;
    },
    removeObjPropertiesFromObjArr: (arr, properties) => {
        let result = [];
        if (Array.isArray(arr) && Array.isArray(properties)) {
            result = arr.map(obj => {
                return Utils.removePropertiesFromObject(obj, properties);
            });
        }
        return result;
    },
    extractToken: request => {
        const authorization = request.headers.authorization;
        if (!authorization) return null;
        return authorization.replace(CONSTANTS.BEARER_HEADER_AUTHORIZE, '');
    },
    calculateDuration(fileSize) {
        const size = Number(fileSize);
        return parseFloat(((size - 44) / (60 * 100000)).toFixed(3));
    },
    isValidRole: (roleName) => {
        const validRoles = Object.keys(CONSTANTS.ROLE);
        return validRoles.includes(roleName);
    },
    isEmailVerified: roles => {
        return roles.map(role => role.name).indexOf(CONSTANTS.ROLE.MANAGER_USER) !== -1
    },
    convertToArray: param => {
        if (!Array.isArray(param)) {
            return [param];
        }
        return param;
    },
};
