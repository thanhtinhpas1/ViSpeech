const bcrypt = require('bcryptjs');
import {v1 as uuidv1} from 'uuid';

export const Utils = {
    hashPassword: (password) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    getUuid: () => {
        return uuidv1();
    },
    comparePassword: (oldPassword, newPassword) => {
        return bcrypt.compare(oldPassword, newPassword);
    },
};
