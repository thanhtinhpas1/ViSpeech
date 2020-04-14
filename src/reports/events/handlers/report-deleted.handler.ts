import {EventsHandler, IEventHandler, EventBus} from '@nestjs/cqrs';
import {ReportDeletedEvent, ReportDeletedSuccessEvent, ReportDeletedFailedEvent} from '../impl/report-deleted.event';
import {Logger, NotFoundException, Inject} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ReportDto} from 'reports/dtos/reports.dto';
import {Repository} from 'typeorm';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';
import { CONSTANTS } from 'common/constant';

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
            const report = await this.repository.findOne({_id: reportId});
            if (!report) {
                throw new NotFoundException(`Report with _id ${reportId} does not exist.`);
            }
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
        this.clientKafka.emit(CONSTANTS.TOPICS.REPORT_DELETED_SUCCESS_EVENT, event);
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
        this.clientKafka.emit(CONSTANTS.TOPICS.REPORT_DELETED_FAILED_EVENT, event);
        Logger.log(event.error, 'ReportDeletedFailedEvent');
    }
}
