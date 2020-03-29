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
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("auth/auth.module");
const event_store_1 = require("core/event-store/event-store");
const handlers_1 = require("tokens/commands/handlers");
const token_repository_1 = require("tokens/repository/token.repository");
const event_store_module_1 = require("../core/event-store/event-store.module");
const handlers_2 = require("./commands/handlers");
const orders_controller_1 = require("./controllers/orders.controller");
const orders_dto_1 = require("./dtos/orders.dto");
const handlers_3 = require("./events/handlers");
const order_created_event_1 = require("./events/impl/order-created.event");
const order_deleted_event_1 = require("./events/impl/order-deleted.event");
const order_updated_event_1 = require("./events/impl/order-updated.event");
const order_welcomed_event_1 = require("./events/impl/order-welcomed.event");
const handler_1 = require("./queries/handler");
const order_repository_1 = require("./repository/order.repository");
const orders_sagas_1 = require("./sagas/orders.sagas");
const orders_service_1 = require("./services/orders.service");
const tokens_module_1 = require("tokens/tokens.module");
const token_types_dto_1 = require("tokens/dtos/token-types.dto");
let OrdersModule = class OrdersModule {
    constructor(command$, query$, event$, ordersSagas, eventStore) {
        this.command$ = command$;
        this.query$ = query$;
        this.event$ = event$;
        this.ordersSagas = ordersSagas;
        this.eventStore = eventStore;
        this.eventHandlers = {
            OrderCreationStartedEvent: (streamId, data) => new order_created_event_1.OrderCreationStartedEvent(streamId, data),
            OrderCreatedEvent: (streamId, data) => new order_created_event_1.OrderCreatedEvent(streamId, data),
            OrderCreatedSuccessEvent: (streamId, data) => new order_created_event_1.OrderCreatedSuccessEvent(streamId, data),
            OrderCreatedFailedEvent: (streamId, data, error) => new order_created_event_1.OrderCreatedFailedEvent(streamId, data, error),
            OrderDeletedEvent: (streamId, data) => new order_deleted_event_1.OrderDeletedEvent(streamId, data),
            OrderUpdatedEvent: (streamId, data) => new order_updated_event_1.OrderUpdatedEvent(streamId, data),
            OrderWelcomedEvent: (streamId, data) => new order_welcomed_event_1.OrderWelcomedEvent(streamId, data)
        };
    }
    onModuleInit() {
        this.eventStore.setEventHandlers(Object.assign(Object.assign({}, this.eventHandlers), tokens_module_1.TokensModule.eventHandlers));
        this.eventStore.bridgeEventsTo(this.event$.subject$);
        this.event$.publisher = this.eventStore;
        this.event$.register(handlers_3.EventHandlers);
        this.command$.register([...handlers_2.CommandHandlers, ...handlers_1.CommandHandlers]);
        this.query$.register(handler_1.QueryHandlers);
        this.event$.registerSagas([orders_sagas_1.OrdersSagas]);
    }
};
OrdersModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([orders_dto_1.OrderDto, token_types_dto_1.TokenTypeDto]),
            common_1.forwardRef(() => auth_module_1.AuthModule),
            event_store_module_1.EventStoreModule.forFeature(),
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [
            orders_service_1.OrdersService,
            orders_sagas_1.OrdersSagas,
            ...handlers_2.CommandHandlers,
            ...handlers_1.CommandHandlers,
            ...handlers_3.EventHandlers,
            ...handler_1.QueryHandlers,
            order_repository_1.OrderRepository,
            token_repository_1.TokenRepository,
            cqrs_1.QueryBus, cqrs_1.EventBus, event_store_1.EventStore, cqrs_1.CommandBus, cqrs_1.EventPublisher,
        ],
        exports: [orders_service_1.OrdersService]
    }),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus,
        cqrs_1.EventBus,
        orders_sagas_1.OrdersSagas,
        event_store_1.EventStore])
], OrdersModule);
exports.OrdersModule = OrdersModule;
//# sourceMappingURL=orders.module.js.map