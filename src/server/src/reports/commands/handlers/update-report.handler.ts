import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateReportCommand } from '../impl/update-report.command';
import { ReportRepository } from '../../repository/report.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { ReportUpdatedFailedEvent } from 'reports/events/impl/report-updated.event';

@CommandHandler(UpdateReportCommand)
export class UpdateReportHandler
    implements ICommandHandler<UpdateReportCommand> {
    constructor(
        private readonly repository: ReportRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: UpdateReportCommand) {
        Logger.log('Async UpdateReportHandler...', 'UpdateReportCommand');
        const { streamId, reportDto } = command;

        try {
            const report = await getMongoRepository(ReportDto).findOne({ _id: reportDto._id });
            if (!report) {
                throw new NotFoundException(`Report with _id ${reportDto._id} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const reportModel = this.publisher.mergeObjectContext(
                await this.repository.updateReport(streamId, reportDto)
            );
            reportModel.commit();
        } catch (error) {
            this.eventBus.publish(new ReportUpdatedFailedEvent(streamId, reportDto, error));
        }
    }
}
