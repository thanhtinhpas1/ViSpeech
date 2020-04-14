import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { kafkaClientOptions } from 'common/kafka-client.options';
import { EventStore } from 'core/event-store/event-store';
import { CreateOrderedTokenHandler } from 'tokens/commands/handlers/create-token.handler';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenRepository } from 'tokens/repository/token.repository';
import { TokensModule } from 'tokens/tokens.module';
import { config } from '../../config';
import { EventStoreModule } from '../core/event-store/event-store.module';
import { CommandHandlers } from './commands/handlers';
import { OrdersController } from './controllers/orders.controller';
import { OrderDto } from './dtos/orders.dto';
import { EventHandlers } from './events/handlers';
import { OrderCreatedEvent, OrderCreatedFailedEvent, OrderCreatedSuccessEvent, OrderCreationStartedEvent } from './events/impl/order-created.event';
import { OrderDeletedEvent, OrderDeletedSuccessEvent, OrderDeletedFailedEvent } from './events/impl/order-deleted.event';
import { OrderUpdatedEvent, OrderUpdatedSuccessEvent, OrderUpdatedFailedEvent } from './events/impl/order-updated.event';
import { OrderWelcomedEvent } from './events/impl/order-welcomed.event';
import { QueryHandlers } from './queries/handler';
import { OrderRepository } from './repository/order.repository';
import { OrdersSagas } from './sagas/orders.sagas';
import { OrdersService } from './services/orders.service';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';

@Module({
    imports: [
        ClientsModule.register([{
            name: config.KAFKA.NAME,
            ...kafkaClientOptions,
        }]),
        TypeOrmModule.forFeature([OrderDto, TokenTypeDto, ProjectDto, TokenDto]),
        forwardRef(() => AuthModule),
        EventStoreModule.forFeature(),
    ],
    controllers: [OrdersController],
    providers: [
        OrdersService,
        OrdersSagas,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        OrderRepository,
        TokenRepository,
        CreateOrderedTokenHandler,
        QueryBus, EventBus, EventStore, CommandBus, EventPublisher,
    ],
    exports: [OrdersService]
})
export class OrdersModule implements OnModuleInit {
    constructor(
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus,
        private readonly ordersSagas: OrdersSagas,
        private readonly eventStore: EventStore
    ) {
    }

    onModuleInit() {
        this.eventStore.setEventHandlers({ ...this.eventHandlers, ...TokensModule.eventHandlers });
        this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
        this.event$.publisher = this.eventStore;
        /** ------------ */
        this.event$.register(EventHandlers);
        this.command$.register([...CommandHandlers, CreateOrderedTokenHandler]);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([OrdersSagas]);
    }

    eventHandlers = {
        // create
        OrderCreationStartedEvent: (streamId, data) => new OrderCreationStartedEvent(streamId, data),
        OrderCreatedEvent: (streamId, data) => new OrderCreatedEvent(streamId, data),
        OrderCreatedSuccessEvent: (streamId, data) => new OrderCreatedSuccessEvent(streamId, data),
        OrderCreatedFailedEvent: (streamId, data, error) => new OrderCreatedFailedEvent(streamId, data, error),

        // update
        OrderUpdatedEvent: (streamId, data) => new OrderUpdatedEvent(streamId, data),
        OrderUpdatedSuccessEvent: (streamId, data) => new OrderUpdatedSuccessEvent(streamId, data),
        OrderUpdatedFailedEvent: (streamId, data, error) => new OrderUpdatedFailedEvent(streamId, data, error),

        // delete
        OrderDeletedEvent: (streamId, data) => new OrderDeletedEvent(streamId, data),
        OrderDeletedSuccessEvent: (streamId, data) => new OrderDeletedSuccessEvent(streamId, data),
        OrderDeletedFailedEvent: (streamId, data, error) => new OrderDeletedFailedEvent(streamId, data, error),

        OrderWelcomedEvent: (streamId, data) => new OrderWelcomedEvent(streamId, data)
    };
}
