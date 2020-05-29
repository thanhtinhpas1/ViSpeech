import { v1 as uuidv1 } from 'uuid';
import { CONSTANTS } from '../common/constant';
import { Logger } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import parser from 'cron-parser';

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
        return Utils.convertToArray(roles).map(role => role.name).includes(CONSTANTS.ROLE.MANAGER_USER)
    },
    convertToArray: param => {
        if (!Array.isArray(param)) {
            return [param];
        }
        return param;
    },
    convertToBoolean: value => {
        return typeof value === 'boolean' ? value : value === 'true'
    },
    previousDateOfCron(cron: string, currentDate?: Date): Date {
        if (!currentDate) currentDate = new Date();
        const options = {
            currentDate,
            tz: 'Asia/Ho_Chi_Minh'
        }
        try {
            const interval = parser.parseExpression(cron, options);
            return new Date(interval.prev().toString());
        } catch (err) {
            Logger.error('Something went wrong when parse cron', err);
            return null;
        }
    },
    nextDateOfCron(cron: string, currentDate?: Date, ): Date {
        if (!currentDate) currentDate = new Date();
        const options = {
            currentDate,
            tz: 'Asia/Ho_Chi_Minh'
        }
        try {
            const interval = parser.parseExpression(cron, options);
            return new Date(interval.next().toString());
        } catch (err) {
            Logger.error('Something went wrong when parse cron', err);
            return null;
        }
    },
    getErrorObj: error => {
        const errorObj = {
            code: '',
            message: '',
        }
        errorObj.code = error.code || error.status
        errorObj.message = error.errmsg || error.message
        return errorObj
    },
    getCorrectSortField: sortField => {
        if (sortField === 'createdDate') {
            return 'created_date'
        }
        if (sortField === 'updatedDate') {
            return 'updated_date'
        }
        return sortField
    }
};