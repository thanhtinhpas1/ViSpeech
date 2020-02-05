const bcrypt = require('bcryptjs');

export const Utils = {
    hashPassword: (password) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    }
}