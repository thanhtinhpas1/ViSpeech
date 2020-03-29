"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_created_handler_1 = require("./token-created.handler");
const token_updated_handler_1 = require("./token-updated.handler");
const token_deleted_handler_1 = require("./token-deleted.handler");
const token_welcomed_handler_1 = require("./token-welcomed.handler");
const free_token_created_handler_1 = require("./free-token-created.handler");
const ordered_token_created_handler_1 = require("./ordered-token-created.handler");
exports.EventHandlers = [
    token_created_handler_1.TokenCreatedHandler,
    token_created_handler_1.TokenCreatedSuccessHandler,
    token_created_handler_1.TokenCreatedFailedHandler,
    token_updated_handler_1.TokenUpdatedHandler,
    token_deleted_handler_1.TokenDeletedHandler,
    token_deleted_handler_1.TokenDeletedByUserIdHandler,
    token_welcomed_handler_1.TokenWelcomedHandler,
    free_token_created_handler_1.FreeTokenCreatedHandler,
    free_token_created_handler_1.FreeTokenCreatedSuccessHandler,
    free_token_created_handler_1.FreeTokenCreatedFailedHandler,
    ordered_token_created_handler_1.OrderedTokenCreatedHandler,
    ordered_token_created_handler_1.OrderedTokenCreatedSuccessHandler,
    ordered_token_created_handler_1.OrderedTokenCreatedFailedHandler
];
//# sourceMappingURL=index.js.map