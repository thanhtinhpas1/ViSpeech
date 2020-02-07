const bcrypt = require('bcryptjs');
const uuid = require('uuid');

export const Utils = {
    hashPassword: (password) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    getUuid: () => {
        return uuid();
    }
}
