"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_order_handler_1 = require("./create-order.handler");
const delete_order_handler_1 = require("./delete-order.handler");
const update_order_handler_1 = require("./update-order.handler");
const welcome_order_handler_1 = require("./welcome-order.handler");
exports.CommandHandlers = [
    create_order_handler_1.CreateOrderStartHandler,
    create_order_handler_1.CreateOrderHandler,
    delete_order_handler_1.DeleteOrderHandler,
    update_order_handler_1.UpdateOrderHandler,
    welcome_order_handler_1.WelcomeOrderHandler
];
//# sourceMappingURL=index.js.map