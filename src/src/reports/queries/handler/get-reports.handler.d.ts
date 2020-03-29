import { GetReportsQuery } from '../impl/get-reports.query';
import { IQueryHandler } from '@nestjs/cqrs';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
export declare class GetReportsHandler implements IQueryHandler<GetReportsQuery> {
    private readonly repository;
    constructor(repository: Repository<ReportDto>);
    execute(query: GetReportsQuery): Promise<ReportDto[]>;
}
