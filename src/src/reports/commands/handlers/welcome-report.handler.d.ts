import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { WelcomeReportCommand } from '../impl/welcome-report.command';
import { ReportRepository } from '../../repository/report.repository';
export declare class WelcomeReportHandler implements ICommandHandler<WelcomeReportCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: ReportRepository, publisher: EventPublisher);
    execute(command: WelcomeReportCommand): Promise<void>;
}
