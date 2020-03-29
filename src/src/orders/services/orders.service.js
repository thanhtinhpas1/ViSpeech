"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const create_order_command_1 = require("../commands/impl/create-order.command");
const update_order_command_1 = require("../commands/impl/update-order.command");
const delete_order_command_1 = require("../commands/impl/delete-order.command");
const get_orders_query_1 = require("orders/queries/impl/get-orders.query");
const find_order_query_1 = require("orders/queries/impl/find-order.query");
const config_1 = require("../../../config");
const get_orders_by_userId_1 = require("orders/queries/impl/get-orders-by-userId");
const stripe = require('stripe')(config_1.config.STRIPE_SECRET_KEY);
let OrdersService = class OrdersService {
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    createOrderStart(streamId, orderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new create_order_command_1.CreateOrderStartCommand(streamId, orderDto));
        });
    }
    createOrder(streamId, orderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new create_order_command_1.CreateOrderCommand(streamId, orderDto));
        });
    }
    updateOrder(streamId, orderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new update_order_command_1.UpdateOrderCommand(streamId, orderDto));
        });
    }
    deleteOrder(streamId, orderIdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new delete_order_command_1.DeleteOrderCommand(streamId, orderIdDto));
        });
    }
    getOrders(getOrdersQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = new get_orders_query_1.GetOrdersQuery();
            Object.assign(query, getOrdersQuery);
            return yield this.queryBus.execute(query);
        });
    }
    getOrdersByUserId(getOrdersByUserIdQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = new get_orders_by_userId_1.GetOrdersByUserIdQuery(getOrdersByUserIdQuery.userId);
            Object.assign(query, getOrdersByUserIdQuery);
            return yield this.queryBus.execute(query);
        });
    }
    findOne(findOrderQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = new find_order_query_1.FindOrderQuery(findOrderQuery.id);
            return yield this.queryBus.execute(query);
        });
    }
    getPaymentIntent(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stripe.paymentIntents.create({
                amount: parseInt(amount),
                currency: 'usd'
            });
        });
    }
};
OrdersService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map