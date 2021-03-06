import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReportCreatedEvent, ReportCreatedFailedEvent, ReportCreatedSuccessEvent } from '../impl/report-created.event';
import { Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
import { CONSTANTS } from 'common/constant';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';
import { Utils } from 'utils';

@EventsHandler(ReportCreatedEvent)
export class ReportCreatedHandler implements IEventHandler<ReportCreatedEvent> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: ReportCreatedEvent) {
        Logger.log(event.reportDto._id, 'ReportCreatedEvent');
        const { streamId, reportDto } = event;

        try {
            reportDto.usedMinutes = Number(reportDto.usedMinutes);
            reportDto.dateReport = new Date(reportDto.dateReport);
            await this.repository.save(reportDto);
            this.eventBus.publish(new ReportCreatedSuccessEvent(streamId, reportDto));
        } catch (error) {
            this.eventBus.publish(new ReportCreatedFailedEvent(streamId, reportDto, error));
        }
    }
}

@EventsHandler(ReportCreatedSuccessEvent)
export class ReportCreatedSuccessHandler
    implements IEventHandler<ReportCreatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ReportCreatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.REPORT_CREATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.reportDto._id, 'ReportCreatedSuccessEvent');
    }
}

@EventsHandler(ReportCreatedFailedEvent)
export class ReportCreatedFailedHandler
    implements IEventHandler<ReportCreatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ReportCreatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.REPORT_CREATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'ReportCreatedFailedEvent');
    }
}
