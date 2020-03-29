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
const cqrs_1 = require("@nestjs/cqrs");
const order_created_event_1 = require("../impl/order-created.event");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orders_dto_1 = require("orders/dtos/orders.dto");
const typeorm_2 = require("typeorm");
const token_types_dto_1 = require("tokens/dtos/token-types.dto");
let OrderCreationStartedHandler = class OrderCreationStartedHandler {
    handle(event) {
        common_1.Logger.log(event.orderDto._id, 'OrderCreationStartedEvent');
    }
};
OrderCreationStartedHandler = __decorate([
    cqrs_1.EventsHandler(order_created_event_1.OrderCreationStartedEvent)
], OrderCreationStartedHandler);
exports.OrderCreationStartedHandler = OrderCreationStartedHandler;
let OrderCreatedHandler = class OrderCreatedHandler {
    constructor(repository, tokenTypeRepository, eventBus) {
        this.repository = repository;
        this.tokenTypeRepository = tokenTypeRepository;
        this.eventBus = eventBus;
    }
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(event.orderDto._id, 'OrderCreatedEvent');
            const { streamId, orderDto } = event;
            const order = JSON.parse(JSON.stringify(orderDto));
            try {
                const tokenTypeDto = yield this.tokenTypeRepository.findOne({ _id: order.tokenType._id });
                if (!tokenTypeDto)
                    throw new common_1.NotFoundException(`Token type with _id ${order.tokenType._id} does not exist.`);
                order.tokenType = tokenTypeDto;
                yield this.repository.save(order);
                this.eventBus.publish(new order_created_event_1.OrderCreatedSuccessEvent(streamId, orderDto));
            }
            catch (error) {
                this.eventBus.publish(new order_created_event_1.OrderCreatedFailedEvent(streamId, orderDto, error));
            }
        });
    }
};
OrderCreatedHandler = __decorate([
    cqrs_1.EventsHandler(order_created_event_1.OrderCreatedEvent),
    __param(0, typeorm_1.InjectRepository(orders_dto_1.OrderDto)),
    __param(1, typeorm_1.InjectRepository(token_types_dto_1.TokenTypeDto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        cqrs_1.EventBus])
], OrderCreatedHandler);
exports.OrderCreatedHandler = OrderCreatedHandler;
let OrderCreatedSuccessHandler = class OrderCreatedSuccessHandler {
    handle(event) {
        common_1.Logger.log(event.orderDto._id, 'OrderCreatedSuccessEvent');
    }
};
OrderCreatedSuccessHandler = __decorate([
    cqrs_1.EventsHandler(order_created_event_1.OrderCreatedSuccessEvent)
], OrderCreatedSuccessHandler);
exports.OrderCreatedSuccessHandler = OrderCreatedSuccessHandler;
let OrderCreatedFailedHandler = class OrderCreatedFailedHandler {
    handle(event) {
        common_1.Logger.log(event.error, 'OrderCreatedFailedEvent');
    }
};
OrderCreatedFailedHandler = __decorate([
    cqrs_1.EventsHandler(order_created_event_1.OrderCreatedFailedEvent)
], OrderCreatedFailedHandler);
exports.OrderCreatedFailedHandler = OrderCreatedFailedHandler;
//# sourceMappingURL=order-created.handler.js.map