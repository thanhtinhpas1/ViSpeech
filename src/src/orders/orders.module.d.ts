import { OnModuleInit } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { EventStore } from 'core/event-store/event-store';
import { OrderCreatedEvent, OrderCreatedFailedEvent, OrderCreatedSuccessEvent, OrderCreationStartedEvent } from './events/impl/order-created.event';
import { OrderDeletedEvent } from './events/impl/order-deleted.event';
import { OrderUpdatedEvent } from './events/impl/order-updated.event';
import { OrderWelcomedEvent } from './events/impl/order-welcomed.event';
import { OrdersSagas } from './sagas/orders.sagas';
export declare class OrdersModule implements OnModuleInit {
    private readonly command$;
    private readonly query$;
    private readonly event$;
    private readonly ordersSagas;
    private readonly eventStore;
    constructor(command$: CommandBus, query$: QueryBus, event$: EventBus, ordersSagas: OrdersSagas, eventStore: EventStore);
    onModuleInit(): void;
    eventHandlers: {
        OrderCreationStartedEvent: (streamId: any, data: any) => OrderCreationStartedEvent;
        OrderCreatedEvent: (streamId: any, data: any) => OrderCreatedEvent;
        OrderCreatedSuccessEvent: (streamId: any, data: any) => OrderCreatedSuccessEvent;
        OrderCreatedFailedEvent: (streamId: any, data: any, error: any) => OrderCreatedFailedEvent;
        OrderDeletedEvent: (streamId: any, data: any) => OrderDeletedEvent;
        OrderUpdatedEvent: (streamId: any, data: any) => OrderUpdatedEvent;
        OrderWelcomedEvent: (streamId: any, data: any) => OrderWelcomedEvent;
    };
}
