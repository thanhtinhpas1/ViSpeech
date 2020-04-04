import { v1 as uuidv1 } from 'uuid';
import { CONSTANTS } from '../common/constant';

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
        return roles.map(role => role.name).indexOf(CONSTANTS.ROLE.MANAGER_USER) !== -1
    },
    convertToArray: param => {
        if (!Array.isArray(param)) {
            return [param];
        }
        return param;
    },
    isValidDate: miliseconds => {
        if (!miliseconds) {
            return false;
        }
        const date = new Date(parseInt(miliseconds));
        return !isNaN(date.getTime());
    },
    getOnlyDate: (date: Date) => {
        let formattedDate = JSON.parse(JSON.stringify(date)); // string
        formattedDate = new Date(formattedDate);
        formattedDate.setHours(0);
        formattedDate.setMinutes(0);
        formattedDate.setSeconds(0);
        formattedDate.setMilliseconds(0);
        return formattedDate;
    },
    addDays: (currentDate: Date, days: number) => {
        var date = new Date(currentDate.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    },
    getDates: (fromDate: Date, toDate: Date) => {
        var dateArray = [];
        var currentDate = fromDate;
        while (currentDate <= toDate) {
          dateArray.push({ date: new Date(currentDate), value: 0 });
          currentDate = Utils.addDays(currentDate, 1);
        }
        return dateArray;
    },  
    getWeek: (date: Date) => {
        var firstDateOfYear = new Date(date.getFullYear(), 0, 1);
        date = Utils.getOnlyDate(date);
        var dayNumberOfYear = (date.valueOf() - firstDateOfYear.valueOf() + CONSTANTS.ONE_DAY_IN_MILISECONDS) / CONSTANTS.ONE_DAY_IN_MILISECONDS;
        return Math.ceil((dayNumberOfYear + firstDateOfYear.getDay()) / 7);
    },
    getQuarter: month => {
        const firstQuarter = [0, 1, 2];
        const secondQuarter = [3, 4, 5];
        const thirdQuarter = [6, 7, 8];
        const fourthQuarter = [9, 10, 11];
        if (firstQuarter.indexOf(month) > -1) {
          return 1;
        }
        if (secondQuarter.indexOf(month) > -1) {
          return 2;
        }
        if (thirdQuarter.indexOf(month) > -1) {
          return 3;
        }
        if (fourthQuarter.indexOf(month) > -1) {
          return 4;
        }
      }
};
