import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReportUpdatedEvent, ReportUpdatedFailedEvent, ReportUpdatedSuccessEvent } from '../impl/report-updated.event';
import { Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { config } from '../../../../config';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';

@EventsHandler(ReportUpdatedEvent)
export class ReportUpdatedHandler implements IEventHandler<ReportUpdatedEvent> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: ReportUpdatedEvent) {
        Logger.log(event.reportDto._id, 'ReportUpdatedEvent'); // write here
        const {streamId, reportDto} = event;
        const {_id, ...reportInfo} = reportDto;

        try {
            await this.repository.update({_id}, reportInfo);
            this.eventBus.publish(new ReportUpdatedSuccessEvent(streamId, reportDto));
        } catch (error) {
            this.eventBus.publish(new ReportUpdatedFailedEvent(streamId, reportDto, error));
        }
    }
}

@EventsHandler(ReportUpdatedSuccessEvent)
export class ReportUpdatedSuccessHandler
    implements IEventHandler<ReportUpdatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ReportUpdatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.REPORT_UPDATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.reportDto._id, 'ReportUpdatedSuccessEvent');
    }
}

@EventsHandler(ReportUpdatedFailedEvent)
export class ReportUpdatedFailedHandler
    implements IEventHandler<ReportUpdatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ReportUpdatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.REPORT_UPDATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'ReportUpdatedFailedEvent');
    }
}
