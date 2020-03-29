import { FindReportQuery } from 'reports/queries/impl/find-report.query';
import { GetReportsQuery } from 'reports/queries/impl/get-reports.query';
import { ReportDto, ReportIdRequestParamsDto } from '../dtos/reports.dto';
import { ReportsService } from '../services/reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    createReport(reportDto: ReportDto): Promise<ReportDto>;
    updateReport(reportIdDto: ReportIdRequestParamsDto, reportDto: ReportDto): Promise<any>;
    deleteReport(reportIdDto: ReportIdRequestParamsDto): Promise<any>;
    findReports(getReportsQuery: GetReportsQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    findOneReport(findReportQuery: FindReportQuery): Promise<ReportDto>;
}
