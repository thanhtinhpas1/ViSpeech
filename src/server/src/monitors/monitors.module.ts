import { forwardRef, Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMongoRepository } from 'typeorm';
import { config } from '../../config';
import { AuthModule } from '../auth/auth.module';
import { kafkaClientOptions } from '../common/kafka-client.options';
import { EventStore, EventStoreModule, EventStoreSubscriptionType } from '../core/event-store/lib';
import { MongoStore } from '../core/event-store/lib/adapter/mongo-store';
import { ProjectionDto } from '../core/event-store/lib/adapter/projection.dto';
import { MonitorsController } from './controllers/monitors.controller';
import { MonitorDto } from './dtos/monitor.dto';
import { EventHandlers } from './events/handlers';
import { $statsCollected, MonitorBeatFailedEvent, MonitorBeatSuccessEvent } from './events/impl/monitor-beat.event';
import { QueryHandlers } from './queries/handlers';
import { MonitorsService } from './services/monitors.service';
import { CONSTANTS } from 'common/constant';

@Module({
    imports: [
        ClientsModule.register([{
            name: config.KAFKA.NAME,
            ...kafkaClientOptions,
        } ]),
        TypeOrmModule.forFeature([
            ProjectionDto,
            MonitorDto,
        ]),
        CqrsModule,
        EventStoreModule.registerFeature({
            featureStreamName: '$stats-0.0.0.0:2113',
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.CatchUp,
                    stream: '$stats-0.0.0.0:2113',
                    resolveLinkTos: true, // Default is true (Optional)
                    lastCheckpoint: 0, // Default is 0 (Optional)
                },
                {
                    type: EventStoreSubscriptionType.CatchUp,
                    stream: '$stats-127.0.0.1:2113',
                    resolveLinkTos: true, // Default is true (Optional)
                    lastCheckpoint: 0, // Default is 0 (Optional)
                },
                {
                    type: EventStoreSubscriptionType.CatchUp,
                    stream: CONSTANTS.STREAM_NAME.MONITOR,
                    resolveLinkTos: true, // Default is true (Optional)
                    lastCheckpoint: 0, // Default is 0 (Optional)
                },
            ],
            eventHandlers: {
                ...MonitorsModule.eventHandlers,
            },
        }),
        forwardRef(() => AuthModule),
    ],
    controllers: [
        MonitorsController,
    ],
    providers: [
        QueryBus,
        EventBus,
        CommandBus,
        EventPublisher,
        MongoStore,
        MonitorsService,
        ...EventHandlers,
        ...QueryHandlers,
    ]
})
export class MonitorsModule implements OnModuleInit, OnModuleDestroy {
    constructor(
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus,
        private readonly eventStore: EventStore,
    ) {
    }

    onModuleDestroy() {
        this.eventStore.close();
    }

    async onModuleInit() {
        this.event$.publisher = this.eventStore;
        this.event$.register(EventHandlers);
        // this.command$.register(CommandHandlers);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([]);
        // seed projection
        await this.seedProjection();
    }

    async seedProjection() {
        const monitorProjection1 = await getMongoRepository(ProjectionDto).findOne({ streamName: '$stats-127.0.0.1:2113' });
        const monitorProjection2 = await getMongoRepository(ProjectionDto).findOne({ streamName: '$stats-0.0.0.0:2113' });
        if (monitorProjection1) {
            await getMongoRepository(ProjectionDto).save({ ...monitorProjection1, expectedVersion: monitorProjection1.eventNumber });
        } else {
            await getMongoRepository(ProjectionDto).save({ streamName: '$stats-127.0.0.1:2113', eventNumber: 0, expectedVersion: CONSTANTS.INIT_EXPECTED_VERSION });
        }
        if (monitorProjection2) {
            await getMongoRepository(ProjectionDto).save({ ...monitorProjection2, expectedVersion: monitorProjection2.eventNumber });
        } else {
            await getMongoRepository(ProjectionDto).save({ streamName: '$stats-0.0.0.0:2113', eventNumber: 0, expectedVersion: CONSTANTS.INIT_EXPECTED_VERSION });
        }
        Logger.log('Seed projection user success')
    }

    public static eventHandlers = {
        $statsCollected: (streamId, snapshot) => new $statsCollected(streamId, snapshot),
        MonitorBeatSuccessEvent: (streamId, snapshot) => new MonitorBeatSuccessEvent(streamId, snapshot),
        MonitorBeatFailedEvent: (streamId, snapshot, error) => new MonitorBeatFailedEvent(streamId, snapshot, error),
    }
}