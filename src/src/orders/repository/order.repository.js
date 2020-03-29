"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const order_model_1 = require("../models/order.model");
let OrderRepository = class OrderRepository {
    createOrderStart(streamId, orderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = new order_model_1.Order(undefined);
            order.setData(orderDto);
            order.createOrderStart(streamId);
            return order;
        });
    }
    createOrder(streamId, orderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = new order_model_1.Order(undefined);
            order.setData(orderDto);
            order.createOrder(streamId);
            return order;
        });
    }
    updateOrder(streamId, orderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = new order_model_1.Order(undefined);
            order.setData(orderDto);
            order.updateOrder(streamId);
            return order;
        });
    }
    deleteOrder(streamId, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = new order_model_1.Order(orderId);
            order.deleteOrder(streamId);
            return order;
        });
    }
    welcomeOrder(streamId, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = new order_model_1.Order(orderId);
            order.welcomeOrder(streamId);
            return order;
        });
    }
};
OrderRepository = __decorate([
    common_1.Injectable()
], OrderRepository);
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=order.repository.js.map