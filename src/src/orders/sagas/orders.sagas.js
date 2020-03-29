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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const order_created_event_1 = require("../events/impl/order-created.event");
const operators_1 = require("rxjs/operators");
const create_order_command_1 = require("orders/commands/impl/create-order.command");
const auth_service_1 = require("auth/auth.service");
const tokens_dto_1 = require("tokens/dtos/tokens.dto");
const create_token_command_1 = require("tokens/commands/impl/create-token.command");
const update_order_command_1 = require("orders/commands/impl/update-order.command");
const orders_dto_1 = require("orders/dtos/orders.dto");
const constant_1 = require("common/constant");
const ordered_token_created_event_1 = require("tokens/events/impl/ordered-token-created.event");
const token_types_dto_1 = require("tokens/dtos/token-types.dto");
let OrdersSagas = class OrdersSagas {
    constructor(authService) {
        this.authService = authService;
        this.startCreatingOrder = (events$) => {
            return events$.pipe(cqrs_1.ofType(order_created_event_1.OrderCreationStartedEvent), operators_1.map((event) => {
                common_1.Logger.log('Inside [OrdersSagas] startCreatingOrder Saga', 'OrdersSagas');
                const { streamId, orderDto } = event;
                return new create_order_command_1.CreateOrderCommand(streamId, orderDto);
            }));
        };
        this.orderCreatedSuccess = (events$) => {
            return events$.pipe(cqrs_1.ofType(order_created_event_1.OrderCreatedSuccessEvent), operators_1.map((event) => {
                common_1.Logger.log("Inside [OrdersSagas] orderCreatedSuccess Saga", "OrdersSagas");
                const { streamId, orderDto } = event;
                const { userId, tokenType, _id, token } = orderDto;
                const tokenValue = this.authService.generateTokenWithUserId(userId);
                const tokenDto = new tokens_dto_1.TokenDto(tokenValue, userId, token.projectId, tokenType.name, tokenType._id, _id);
                return new create_token_command_1.CreateOrderedTokenCommand(streamId, tokenDto);
            }));
        };
        this.orderedTokenCreatedSuccess = (events$) => {
            return events$.pipe(cqrs_1.ofType(ordered_token_created_event_1.OrderedTokenCreatedSuccessEvent), operators_1.map((event) => {
                common_1.Logger.log('Inside [OrdersSagas] orderedTokenCreatedSuccess Saga', 'OrdersSagas');
                const { streamId, tokenDto } = event;
                const { userId, orderId } = tokenDto;
                const tempTokenTypeDto = token_types_dto_1.TokenTypeDto.createTempInstance();
                const orderDto = new orders_dto_1.OrderDto(userId, tempTokenTypeDto, tokenDto, constant_1.CONSTANTS.STATUS.SUCCESS);
                orderDto._id = orderId;
                return new update_order_command_1.UpdateOrderCommand(streamId, orderDto);
            }));
        };
        this.orderedTokenCreatedFailed = (events$) => {
            return events$.pipe(cqrs_1.ofType(ordered_token_created_event_1.OrderedTokenCreatedFailedEvent), operators_1.map((event) => {
                common_1.Logger.log('Inside [OrdersSagas] orderedTokenCreatedFailed Saga', 'OrdersSagas');
                const { streamId, tokenDto } = event;
                const { userId, orderId } = tokenDto;
                const tempTokenTypeDto = token_types_dto_1.TokenTypeDto.createTempInstance();
                const orderDto = new orders_dto_1.OrderDto(userId, tempTokenTypeDto, tokenDto, constant_1.CONSTANTS.STATUS.FAILURE);
                orderDto._id = orderId;
                return new update_order_command_1.UpdateOrderCommand(streamId, orderDto);
            }));
        };
    }
};
__decorate([
    cqrs_1.Saga(),
    __metadata("design:type", Object)
], OrdersSagas.prototype, "startCreatingOrder", void 0);
__decorate([
    cqrs_1.Saga(),
    __metadata("design:type", Object)
], OrdersSagas.prototype, "orderCreatedSuccess", void 0);
__decorate([
    cqrs_1.Saga(),
    __metadata("design:type", Object)
], OrdersSagas.prototype, "orderedTokenCreatedSuccess", void 0);
__decorate([
    cqrs_1.Saga(),
    __metadata("design:type", Object)
], OrdersSagas.prototype, "orderedTokenCreatedFailed", void 0);
OrdersSagas = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], OrdersSagas);
exports.OrdersSagas = OrdersSagas;
//# sourceMappingURL=orders.sagas.js.map