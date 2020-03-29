import { Report } from '../models/report.model';
import { ReportDto } from 'reports/dtos/reports.dto';
export declare class ReportRepository {
    createReport(streamId: string, reportDto: ReportDto): Promise<Report>;
    updateReport(streamId: string, reportDto: ReportDto): Promise<Report>;
    deleteReport(streamId: string, reportId: string): Promise<Report>;
    welcomeReport(streamId: string, reportId: string): Promise<Report>;
}
