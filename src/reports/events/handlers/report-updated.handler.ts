import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {ReportUpdatedEvent} from '../impl/report-updated.event';
import {Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ReportDto} from 'reports/dtos/reports.dto';
import {Repository} from 'typeorm';

@EventsHandler(ReportUpdatedEvent)
export class ReportUpdatedHandler implements IEventHandler<ReportUpdatedEvent> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>
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

            return await this.repository.update({_id}, reportInfo);
        } catch (error) {
            Logger.error(error, '', 'ReportUpdatedEvent');
        }
    }
}
