import {AggregateRoot} from '@nestjs/cqrs';
import {ReportCreatedEvent} from '../events/impl/report-created.event';
import {ReportUpdatedEvent} from '../events/impl/report-updated.event';
import {ReportDeletedEvent} from '../events/impl/report-deleted.event';
import {ReportWelcomedEvent} from '../events/impl/report-welcomed.event';

export class Report extends AggregateRoot {
    [x: string]: any;

    constructor(private readonly id: string | undefined) {
        super();
    }

    setData(data) {
        this.data = data;
    }

    createReport(streamId: string) {
        this.apply(new ReportCreatedEvent(streamId, this.data));
    }

    updateReport(streamId: string) {
        this.apply(new ReportUpdatedEvent(streamId, this.data));
    }

    welcomeReport(streamId: string) {
        this.apply(new ReportWelcomedEvent(streamId, this.id));
    }

    deleteReport(streamId: string) {
        this.apply(new ReportDeletedEvent(streamId, this.id));
    }
}
