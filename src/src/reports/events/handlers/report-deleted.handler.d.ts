import { IEventHandler } from '@nestjs/cqrs';
import { ReportDeletedEvent } from '../impl/report-deleted.event';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
export declare class ReportDeletedHandler implements IEventHandler<ReportDeletedEvent> {
    private readonly repository;
    constructor(repository: Repository<ReportDto>);
    handle(event: ReportDeletedEvent): Promise<void>;
}
