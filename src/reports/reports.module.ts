import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { EventStore } from '../core/event-store/event-store';
import { EventStoreModule } from '../core/event-store/event-store.module';
import { CommandHandlers } from './commands/handlers';
import { ReportsController } from './controllers/reports.controller';
import { ReportDto } from './dtos/reports.dto';
import { EventHandlers } from './events/handlers';
import { ReportCreatedEvent } from './events/impl/report-created.event';
import { ReportDeletedEvent } from './events/impl/report-deleted.event';
import { ReportUpdatedEvent } from './events/impl/report-updated.event';
import { ReportWelcomedEvent } from './events/impl/report-welcomed.event';
import { QueryHandlers } from './queries/handler';
import { ReportRepository } from './repository/report.repository';
import { ReportsSagas } from './sagas/reports.sagas';
import { ReportsService } from './services/reports.service';
import { TokenDto } from 'tokens/dtos/tokens.dto';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReportDto, TokenDto]),
        EventStoreModule.forFeature(),
        forwardRef(() => AuthModule),
    ],
    controllers: [ReportsController],
    providers: [
        ReportsService,
        ReportsSagas,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        ReportRepository,
        QueryBus, EventBus, EventStore, CommandBus, EventPublisher,
    ],
    exports: [ReportsService]
})
export class ReportsModule implements OnModuleInit {
    constructor(
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus,
        private readonly eventStore: EventStore
    ) {
    }

    async onModuleInit() {
        this.eventStore.setEventHandlers(this.eventHandlers);
        this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
        this.event$.publisher = this.eventStore;
        /** ------------ */
        this.event$.register(EventHandlers);
        this.command$.register(CommandHandlers);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([ReportsSagas]);
    }

    eventHandlers = {
        ReportCreatedEvent: (streamId, data) => new ReportCreatedEvent(streamId, data),
        ReportDeletedEvent: (streamId, data) => new ReportDeletedEvent(streamId, data),
        ReportUpdatedEvent: (streamId, data) => new ReportUpdatedEvent(streamId, data),
        ReportWelcomedEvent: (streamId, data) => new ReportWelcomedEvent(streamId, data)
    };
}
