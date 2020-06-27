import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReportDeletedEvent, ReportDeletedFailedEvent, ReportDeletedSuccessEvent } from '../impl/report-deleted.event';
import { Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';

@EventsHandler(ReportDeletedEvent)
export class ReportDeletedHandler implements IEventHandler<ReportDeletedEvent> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: ReportDeletedEvent) {
        Logger.log(event.reportId, 'ReportDeletedEvent');
        const {streamId, reportId} = event;

        try {
            await this.repository.delete({_id: reportId});
            this.eventBus.publish(new ReportDeletedSuccessEvent(streamId, reportId));
        } catch (error) {
            this.eventBus.publish(new ReportDeletedFailedEvent(streamId, reportId, error));
        }
    }
}

@EventsHandler(ReportDeletedSuccessEvent)
export class ReportDeletedSuccessHandler
    implements IEventHandler<ReportDeletedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ReportDeletedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.REPORT_DELETED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.reportId, 'ReportDeletedSuccessEvent');
    }
}

@EventsHandler(ReportDeletedFailedEvent)
export class ReportDeletedFailedHandler
    implements IEventHandler<ReportDeletedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ReportDeletedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.REPORT_DELETED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'ReportDeletedFailedEvent');
    }
}
