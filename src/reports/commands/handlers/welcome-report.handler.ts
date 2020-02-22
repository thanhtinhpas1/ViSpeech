import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {WelcomeReportCommand} from '../impl/welcome-report.command';
import {ReportRepository} from '../../repository/report.repository';
import {Logger} from '@nestjs/common';

@CommandHandler(WelcomeReportCommand)
export class WelcomeReportHandler
    implements ICommandHandler<WelcomeReportCommand> {
    constructor(
        private readonly repository: ReportRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: WelcomeReportCommand) {
        Logger.log('Async WelcomeReportHandler...', 'WelcomeReportCommand');
        const {reportId} = command;
        const report = this.publisher.mergeObjectContext(
            await this.repository.welcomeReport(reportId)
        );
        report.commit();
    }
}
