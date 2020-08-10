import { forwardRef, Logger, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { CONSTANTS } from 'common/constant';
import { kafkaClientOptions } from 'common/kafka-client.options';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { getMongoRepository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { config } from '../../config';
import { EventStore, EventStoreModule } from '../core/event-store/lib';
import { MongoStore } from '../core/event-store/lib/adapter/mongo-store';
import { ProjectionDto } from '../core/event-store/lib/adapter/projection.dto';
import { EventStoreSubscriptionType } from '../core/event-store/lib/contract';
import { CommandHandlers } from './commands/handlers';
import { OrdersController } from './controllers/orders.controller';
import { OrderDto } from './dtos/orders.dto';
import { EventHandlers } from './events/handlers';
import { OrderCreatedEvent, OrderCreatedFailedEvent, OrderCreatedSuccessEvent } from './events/impl/order-created.event';
import { OrderDeletedEvent, OrderDeletedFailedEvent, OrderDeletedSuccessEvent } from './events/impl/order-deleted.event';
import {
    OrderToUpgradeCreatedEvent,
    OrderToUpgradeCreatedFailedEvent,
    OrderToUpgradeCreatedSuccessEvent
} from './events/impl/order-to-upgrade-created.event';
import { OrderUpdatedEvent, OrderUpdatedFailedEvent, OrderUpdatedSuccessEvent } from './events/impl/order-updated.event';
import { OrderWelcomedEvent } from './events/impl/order-welcomed.event';
import { QueryHandlers } from './queries/handler';
import { OrderRepository } from './repository/order.repository';
import { OrdersSagas } from './sagas/orders.sagas';
import { OrdersService } from './services/orders.service';


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
            featureStreamName: CONSTANTS.STREAM_NAME.ORDER,
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.CatchUp,
                    stream: CONSTANTS.STREAM_NAME.ORDER,
                    resolveLinkTos: true, // Default is true (Optional)
                    lastCheckpoint: 0, // Default is 0 (Optional)
                },
                {
                    type: EventStoreSubscriptionType.Persistent,
                    stream:  CONSTANTS.STREAM_NAME.ORDER,
                    persistentSubscriptionName: CONSTANTS.STREAM_NAME.ORDER + '-' + config.HOST,
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
export class OrdersModule implements OnModuleInit {
    constructor(
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus,
        private readonly ordersSagas: OrdersSagas,
        private readonly eventStore: EventStore,
    ) {
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
        const streamName = CONSTANTS.STREAM_NAME.ORDER;
        const orderProjection = await getMongoRepository(ProjectionDto).findOne({ streamName });
        if (orderProjection) {
            await getMongoRepository(ProjectionDto).save({
                ...orderProjection,
                expectedVersion: orderProjection.eventNumber
            });
        } else {
            await getMongoRepository(ProjectionDto).save({
                streamName,
                eventNumber: 0,
                expectedVersion: CONSTANTS.INIT_EXPECTED_VERSION
            });
        }
        Logger.log('Seed projection order success');
    }

    public static eventHandlers = {
        // create
        OrderCreatedEvent: (streamId, data, token) => new OrderCreatedEvent(streamId, data, token),
        OrderCreatedSuccessEvent: (streamId, data, token) => new OrderCreatedSuccessEvent(streamId, data, token),
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
