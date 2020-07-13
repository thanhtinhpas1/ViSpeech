import { forwardRef, Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { kafkaClientOptions } from 'common/kafka-client.options';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { config } from '../../config';
import { CommandHandlers } from './commands/handlers';
import { OrdersController } from './controllers/orders.controller';
import { OrderDto } from './dtos/orders.dto';
import { EventHandlers } from './events/handlers';
import { OrderCreatedEvent, OrderCreatedFailedEvent, OrderCreatedSuccessEvent } from './events/impl/order-created.event';
import { OrderToUpgradeCreatedEvent, OrderToUpgradeCreatedSuccessEvent,
    OrderToUpgradeCreatedFailedEvent } from './events/impl/order-to-upgrade-created.event';
import { OrderDeletedEvent, OrderDeletedFailedEvent, OrderDeletedSuccessEvent } from './events/impl/order-deleted.event';
import { OrderUpdatedEvent, OrderUpdatedFailedEvent, OrderUpdatedSuccessEvent } from './events/impl/order-updated.event';
import { OrderWelcomedEvent } from './events/impl/order-welcomed.event';
import { QueryHandlers } from './queries/handler';
import { OrderRepository } from './repository/order.repository';
import { OrdersSagas } from './sagas/orders.sagas';
import { OrdersService } from './services/orders.service';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { UserDto } from 'users/dtos/users.dto';
import { ProjectionDto } from '../core/event-store/lib/adapter/projection.dto';
import { EventStoreSubscriptionType } from '../core/event-store/lib/contract';
import { EventStore, EventStoreModule } from '../core/event-store/lib';
import { MongoStore } from '../core/event-store/lib/adapter/mongo-store';
import { getMongoRepository } from 'typeorm';

@Module({
    imports: [
        ClientsModule.register([{
            name: config.KAFKA.NAME,
            ...kafkaClientOptions,
        }]),
        TypeOrmModule.forFeature([
            OrderDto, TokenTypeDto, ProjectDto,
            TokenDto, PermissionDto, UserDto, ProjectionDto
        ]),
        CqrsModule,
        EventStoreModule.registerFeature({
            featureStreamName: '$ce-order',
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.CatchUp,
                    stream: '$ce-order',
                    resolveLinkTos: true, // Default is true (Optional)
                    lastCheckpoint: 0, // Default is 0 (Optional)
                },
                {
                    type: EventStoreSubscriptionType.Volatile,
                    stream: '$ce-order',
                },
                {
                    type: EventStoreSubscriptionType.Persistent,
                    stream: '$ce-order',
                    persistentSubscriptionName: 'steamName',
                    resolveLinkTos: true,  // Default is true (Optional)
                },
            ],
            eventHandlers: {
                ...OrdersModule.eventHandlers,
            },
        }),
        forwardRef(() => AuthModule),
    ],
    controllers: [OrdersController],
    providers: [
        OrdersService,
        OrdersSagas,
        OrderRepository,
        QueryBus, EventBus,
        CommandBus, EventPublisher,
        MongoStore,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
    ],
    exports: [OrdersService]
})
export class OrdersModule implements OnModuleInit, OnModuleDestroy {
    constructor(
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus,
        private readonly ordersSagas: OrdersSagas,
        private readonly eventStore: EventStore,
    ) {
    }

    onModuleDestroy() {
        this.eventStore.close();
    }

    async onModuleInit() {
        this.event$.publisher = this.eventStore;
        this.event$.register(EventHandlers);
        this.command$.register(CommandHandlers);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([OrdersSagas]);
        await this.seedProjection();
    }

    async seedProjection() {
        const orderProjection = await getMongoRepository(ProjectionDto).findOne({streamName: '$ce-order'});
        if (orderProjection) {
            await getMongoRepository(ProjectionDto).save({...orderProjection, expectedVersion: orderProjection.eventNumber});
        } else {
            await getMongoRepository(ProjectionDto).save({streamName: '$ce-order', eventNumber: 0, expectedVersion: 0});
        }
        Logger.log('Seed projection order success')
    }

    public static eventHandlers = {
        // create
        OrderCreatedEvent: (streamId, data) => new OrderCreatedEvent(streamId, data),
        OrderCreatedSuccessEvent: (streamId, data) => new OrderCreatedSuccessEvent(streamId, data),
        OrderCreatedFailedEvent: (streamId, data, error) => new OrderCreatedFailedEvent(streamId, data, error),
        // create order to upgrade token
        OrderToUpgradeCreatedEvent: (streamId, data) => new OrderToUpgradeCreatedEvent(streamId, data),
        OrderToUpgradeCreatedSuccessEvent: (streamId, data) => new OrderToUpgradeCreatedSuccessEvent(streamId, data),
        OrderToUpgradeCreatedFailedEvent: (streamId, data, error) => new OrderToUpgradeCreatedFailedEvent(streamId, data, error),
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
