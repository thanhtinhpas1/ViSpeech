import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteReportCommand } from '../impl/delete-report.command';
import { ReportRepository } from '../../repository/report.repository';
export declare class DeleteReportHandler implements ICommandHandler<DeleteReportCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: ReportRepository, publisher: EventPublisher);
    execute(command: DeleteReportCommand): Promise<void>;
}
