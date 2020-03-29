import { IQueryHandler } from '@nestjs/cqrs';
import { FindReportQuery } from '../impl/find-report.query';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
export declare class FindReportHandler implements IQueryHandler<FindReportQuery> {
    private readonly repository;
    constructor(repository: Repository<ReportDto>);
    execute(query: FindReportQuery): Promise<any>;
}
