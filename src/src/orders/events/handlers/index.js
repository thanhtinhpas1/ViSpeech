"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_created_handler_1 = require("./order-created.handler");
const order_updated_handler_1 = require("./order-updated.handler");
const order_deleted_handler_1 = require("./order-deleted.handler");
const order_welcomed_handler_1 = require("./order-welcomed.handler");
exports.EventHandlers = [
    order_created_handler_1.OrderCreationStartedHandler,
    order_created_handler_1.OrderCreatedHandler,
    order_created_handler_1.OrderCreatedSuccessHandler,
    order_created_handler_1.OrderCreatedFailedHandler,
    order_updated_handler_1.OrderUpdatedHandler,
    order_deleted_handler_1.OrderDeletedHandler,
    order_welcomed_handler_1.OrderWelcomedHandler
];
//# sourceMappingURL=index.js.map