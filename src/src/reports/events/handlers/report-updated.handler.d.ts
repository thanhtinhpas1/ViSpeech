import { IEventHandler } from '@nestjs/cqrs';
import { ReportUpdatedEvent } from '../impl/report-updated.event';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
export declare class ReportUpdatedHandler implements IEventHandler<ReportUpdatedEvent> {
    private readonly repository;
    constructor(repository: Repository<ReportDto>);
    handle(event: ReportUpdatedEvent): Promise<import("typeorm").UpdateResult>;
}
