import { OnModuleInit } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { EventStore } from '../core/event-store/event-store';
import { ReportCreatedEvent } from './events/impl/report-created.event';
import { ReportDeletedEvent } from './events/impl/report-deleted.event';
import { ReportUpdatedEvent } from './events/impl/report-updated.event';
import { ReportWelcomedEvent } from './events/impl/report-welcomed.event';
import { ReportsSagas } from './sagas/reports.sagas';
export declare class ReportsModule implements OnModuleInit {
    private readonly command$;
    private readonly query$;
    private readonly event$;
    private readonly reportsSagas;
    private readonly eventStore;
    constructor(command$: CommandBus, query$: QueryBus, event$: EventBus, reportsSagas: ReportsSagas, eventStore: EventStore);
    onModuleInit(): Promise<void>;
    eventHandlers: {
        ReportCreatedEvent: (streamId: any, data: any) => ReportCreatedEvent;
        ReportDeletedEvent: (streamId: any, data: any) => ReportDeletedEvent;
        ReportUpdatedEvent: (streamId: any, data: any) => ReportUpdatedEvent;
        ReportWelcomedEvent: (streamId: any, data: any) => ReportWelcomedEvent;
    };
}
