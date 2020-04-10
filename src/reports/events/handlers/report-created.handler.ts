import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {ReportCreatedEvent} from '../impl/report-created.event';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ReportDto} from 'reports/dtos/reports.dto';
import {Repository} from 'typeorm';

@EventsHandler(ReportCreatedEvent)
export class ReportCreatedHandler implements IEventHandler<ReportCreatedEvent> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>
    ) {
    }

    async handle(event: ReportCreatedEvent) {
        Logger.log(event.reportDto._id, 'ReportCreatedEvent');
        const {streamId, reportDto} = event;

        try {
            reportDto.usedMinutes = Number(reportDto.usedMinutes);
            reportDto.dateReport = new Date(reportDto.dateReport);
            return await this.repository.save(reportDto);
        } catch (error) {
            Logger.error(error, '', 'ReportCreatedEvent');
        }
    }
}
