"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_tokens_handler_1 = require("./get-tokens.handler");
const get_tokens_by_userId_handler_1 = require("./get-tokens-by-userId.handler");
const find_token_handler_1 = require("./find-token.handler");
exports.QueryHandlers = [
    get_tokens_handler_1.GetTokensHandler,
    get_tokens_handler_1.GetTokenTypesHandler,
    get_tokens_by_userId_handler_1.GetTokensByUserIdHandler,
    find_token_handler_1.FindTokenHandler
];
//# sourceMappingURL=index.js.map