import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteReportCommand } from '../impl/delete-report.command';
import { ReportRepository } from '../../repository/report.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { ReportDeletedFailedEvent } from 'reports/events/impl/report-deleted.event';

@CommandHandler(DeleteReportCommand)
export class DeleteReportHandler
    implements ICommandHandler<DeleteReportCommand> {
    constructor(
        private readonly repository: ReportRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: DeleteReportCommand) {
        Logger.log('Async DeleteReportHandler...', 'DeleteReportCommand');
        const {streamId, reportIdDto} = command;
        const reportId = reportIdDto._id;

        try {
            const report = await getMongoRepository(ReportDto).findOne({_id: reportId});
            if (!report) {
                throw new NotFoundException(`Report with _id ${reportId} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const reportModel = this.publisher.mergeObjectContext(
                await this.repository.deleteReport(streamId, reportId)
            );
            reportModel.commit();
        } catch (error) {
            this.eventBus.publish(new ReportDeletedFailedEvent(streamId, reportId, error));
        }
    }
}
