import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ReportDto, ReportIdRequestParamsDto } from '../dtos/reports.dto';
import { GetReportsQuery } from 'reports/queries/impl/get-reports.query';
import { FindReportQuery } from 'reports/queries/impl/find-report.query';
export declare class ReportsService {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    createReport(streamId: string, reportDto: ReportDto): Promise<any>;
    updateReport(streamId: string, reportDto: ReportDto): Promise<any>;
    deleteReport(streamId: string, reportIdDto: ReportIdRequestParamsDto): Promise<any>;
    findReports(getReportsQuery: GetReportsQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    findOne(findReportQuery: FindReportQuery): Promise<ReportDto>;
}
