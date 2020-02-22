import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {DeleteReportCommand} from '../impl/delete-report.command';
import {ReportRepository} from '../../repository/report.repository';
import {Logger} from '@nestjs/common';

@CommandHandler(DeleteReportCommand)
export class DeleteReportHandler implements ICommandHandler<DeleteReportCommand> {
    constructor(
        private readonly repository: ReportRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: DeleteReportCommand) {
        Logger.log('Async DeleteReportHandler...', 'DeleteReportCommand');
        const {reportIdDto} = command;
        const report = this.publisher.mergeObjectContext(
            await this.repository.deleteReport(reportIdDto.id)
        );
        report.commit();
    }
}
