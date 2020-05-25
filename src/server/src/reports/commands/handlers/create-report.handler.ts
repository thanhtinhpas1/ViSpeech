import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {CreateReportCommand} from '../impl/create-report.command';
import {ReportRepository} from '../../repository/report.repository';
import {Logger} from '@nestjs/common';

@CommandHandler(CreateReportCommand)
export class CreateReportHandler
    implements ICommandHandler<CreateReportCommand> {
    constructor(
        private readonly repository: ReportRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: CreateReportCommand) {
        Logger.log('Async CreateReportHandler...', 'CreateReportCommand');

        const {streamId, reportDto} = command;
        // use mergeObjectContext for dto dispatch events
        const report = this.publisher.mergeObjectContext(
            await this.repository.createReport(streamId, reportDto)
        );
        report.commit();
    }
}
