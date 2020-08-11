import { v1 as uuidv1 } from 'uuid';
import { CONSTANTS } from '../common/constant';
import bcrypt from 'bcryptjs';

export const Utils = {
    hashPassword: (password: string) => {
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, salt);
        }
        return null;
    },
    getUuid: () => {
        return uuidv1();
    },
    comparePassword: (plainTextPassword: string, hashedPassword: string) => {
        return bcrypt.compareSync(plainTextPassword, hashedPassword);
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
        return Utils.convertToArray(roles).map(role => role.name).includes(CONSTANTS.ROLE.MANAGER_USER);
    },
    convertToArray: param => {
        if (!Array.isArray(param)) {
            return [param];
        }
        return param;
    },
    convertToBoolean: value => {
        return typeof value === 'boolean' ? value : value === 'true';
    },
    getErrorObj: error => {
        const errorObj = {
            code: '',
            message: '',
        };
        errorObj.code = error.code || error.status;
        errorObj.message = error.errmsg || error.message;
        if (errorObj.message == null || errorObj.message === '') {
            errorObj.message = error?.writeErrors?.errmsg ||
                (Array.isArray(error?.writeErrors) && error?.writeErrors.length > 0 && error?.writeErrors[0].errmsg) || '';
        }
        return errorObj;
    },
    getCorrectSortField: sortField => {
        if (sortField === 'createdDate') {
            return 'createdDate';
        }
        if (sortField === 'updatedDate') {
            return 'updatedDate';
        }
        return sortField;
    },
    validDate: (time: number) => {
        const date = new Date(time);
        return date instanceof Date && !isNaN(date.valueOf());
    },
    getOnlyDate: (time: number) => {
        const date = new Date(time);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    validExpirationDate: (time: number) => {
        const now = new Date();
        return Utils.validDate(time) && Utils.getOnlyDate(time) > Utils.getOnlyDate(now.getTime());
    },
    tokenExpired: (expiresIn: number | string) => {
        return Number(expiresIn) < Date.now()
    }
};
