import {CONSTANTS} from 'common/constant';
import {v1 as uuidv1} from 'uuid';

const bcrypt = require('bcryptjs');

export const Utils = {
    hashPassword: password => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    getUuid: () => {
        return uuidv1();
    },
    comparePassword: (oldPassword, newPassword) => {
        return bcrypt.compare(oldPassword, newPassword);
    },
    formatUserRoles: roles => {
        if (!roles) {
            return [{name: CONSTANTS.ROLE.USER}];
        }
        if (!Array.isArray(roles)) {
            return [roles];
        }
        return roles;
    },
    removeNullOrEmptyPropertyOfObj: obj => {
        const result = JSON.parse(JSON.stringify(obj));
        if (typeof (result) === 'object') {
            Object.keys(result).forEach(property => {
                if (result[property] == null || result[property] === '') {
                    delete result[property];
                }
            });
        }
        return result;
    },
};
