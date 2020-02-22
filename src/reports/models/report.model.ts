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

    createReport() {
        this.apply(new ReportCreatedEvent(this.data));
    }

    updateReport() {
        this.apply(new ReportUpdatedEvent(this.data));
    }

    welcomeReport() {
        this.apply(new ReportWelcomedEvent(this.id));
    }

    deleteReport() {
        this.apply(new ReportDeletedEvent(this.id));
    }
}
