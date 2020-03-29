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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const swagger_1 = require("@nestjs/swagger");
const find_order_query_1 = require("orders/queries/impl/find-order.query");
const get_orders_query_1 = require("orders/queries/impl/get-orders.query");
const orders_dto_1 = require("../dtos/orders.dto");
const orders_service_1 = require("../services/orders.service");
const order_guard_1 = require("auth/guards/order.guard");
const constant_1 = require("common/constant");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("auth/roles.decorator");
const get_orders_by_userId_1 = require("orders/queries/impl/get-orders-by-userId");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    createOrder(orderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = orderDto._id;
            return this.ordersService.createOrderStart(streamId, orderDto);
        });
    }
    updateOrder(orderIdDto, orderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = orderIdDto._id;
            return this.ordersService.updateOrder(streamId, Object.assign(Object.assign({}, orderDto), { _id: orderIdDto._id }));
        });
    }
    deleteOrder(orderIdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = orderIdDto._id;
            return this.ordersService.deleteOrder(streamId, orderIdDto);
        });
    }
    getOrders(getOrdersQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ordersService.getOrders(getOrdersQuery);
        });
    }
    findOneOrder(findOrderQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ordersService.findOne(findOrderQuery);
        });
    }
    getOrdersByUserId(getOrdersByUserIdQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ordersService.getOrdersByUserId(getOrdersByUserIdQuery);
        });
    }
    getPaymentIntent(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentIntent = yield this.ordersService.getPaymentIntent(body.amount);
                return { clientSecret: paymentIntent.client_secret };
            }
            catch (err) {
                throw err;
            }
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ tags: ['Create Order'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Create Order.' }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orders_dto_1.OrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Update Order'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Update Order.' }),
    common_1.Put(':_id'),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orders_dto_1.OrderIdRequestParamsDto,
        orders_dto_1.OrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrder", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Delete Order'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Delete Order.' }),
    common_1.Delete(':_id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orders_dto_1.OrderIdRequestParamsDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "deleteOrder", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['List Orders'] }),
    swagger_1.ApiResponse({ status: 200, description: 'List Orders.' }),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN]),
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_orders_query_1.GetOrdersQuery]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrders", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Get Order'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Get Order.' }),
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_order_query_1.FindOrderQuery]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOneOrder", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['List Orders By UserId'] }),
    swagger_1.ApiResponse({ status: 200, description: 'List Orders By UserId.' }),
    common_1.Get('/userId'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_orders_by_userId_1.GetOrdersByUserIdQuery]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrdersByUserId", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Get Payment Intent'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Get Payment Intent.' }),
    common_1.Post('/payment-intent'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getPaymentIntent", null);
OrdersController = __decorate([
    common_1.Controller('orders'),
    swagger_1.ApiTags('Orders'),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), order_guard_1.OrderGuard),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map