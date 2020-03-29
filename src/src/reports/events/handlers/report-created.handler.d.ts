import { IEventHandler } from '@nestjs/cqrs';
import { ReportCreatedEvent } from '../impl/report-created.event';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
export declare class ReportCreatedHandler implements IEventHandler<ReportCreatedEvent> {
    private readonly repository;
    constructor(repository: Repository<ReportDto>);
    handle(event: ReportCreatedEvent): Promise<ReportDto>;
}
