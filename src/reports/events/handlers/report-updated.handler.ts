import {EventsHandler, IEventHandler, EventBus} from '@nestjs/cqrs';
import {ReportUpdatedEvent, ReportUpdatedSuccessEvent, ReportUpdatedFailedEvent} from '../impl/report-updated.event';
import {Logger, NotFoundException, Inject} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ReportDto} from 'reports/dtos/reports.dto';
import {Repository} from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { config } from '../../../../config';
import { CONSTANTS } from 'common/constant';

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
            const report = await this.repository.findOne({ _id });
            if (!report) {
                throw new NotFoundException(`Report with _id ${_id} does not exist.`);
            }

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
        this.clientKafka.emit(CONSTANTS.TOPICS.REPORT_UPDATED_SUCCESS_EVENT, event);
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
        this.clientKafka.emit(CONSTANTS.TOPICS.REPORT_UPDATED_FAILED_EVENT, event);
        Logger.log(event.error, 'ReportUpdatedFailedEvent');
    }
}
