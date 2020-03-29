import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateReportCommand } from '../impl/create-report.command';
import { ReportRepository } from '../../repository/report.repository';
export declare class CreateReportHandler implements ICommandHandler<CreateReportCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: ReportRepository, publisher: EventPublisher);
    execute(command: CreateReportCommand): Promise<void>;
}
