"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_token_handler_1 = require("./create-token.handler");
const delete_token_handler_1 = require("./delete-token.handler");
const update_token_handler_1 = require("./update-token.handler");
const welcome_token_handler_1 = require("./welcome-token.handler");
exports.CommandHandlers = [
    create_token_handler_1.CreateTokenHandler,
    create_token_handler_1.CreateFreeTokenHandler,
    create_token_handler_1.CreateOrderedTokenHandler,
    delete_token_handler_1.DeleteTokenHandler,
    delete_token_handler_1.DeleteTokenByUserIdHandler,
    update_token_handler_1.UpdateTokenHandler,
    welcome_token_handler_1.WelcomeTokenHandler,
];
//# sourceMappingURL=index.js.map