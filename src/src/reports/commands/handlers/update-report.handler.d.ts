import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateReportCommand } from '../impl/update-report.command';
import { ReportRepository } from '../../repository/report.repository';
export declare class UpdateReportHandler implements ICommandHandler<UpdateReportCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: ReportRepository, publisher: EventPublisher);
    execute(command: UpdateReportCommand): Promise<void>;
}
