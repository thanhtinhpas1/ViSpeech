"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const find_user_username_handler_1 = require("./find-user-username.handler");
const find_user_handler_1 = require("./find-user.handler");
const get_users_handler_1 = require("./get-users.handler");
exports.QueryHandlers = [
    get_users_handler_1.GetUsersHandler,
    find_user_handler_1.FindUserHandler,
    find_user_username_handler_1.FindUserUsernameHandler
];
//# sourceMappingURL=index.js.map