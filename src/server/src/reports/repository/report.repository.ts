import { Injectable } from '@nestjs/common';
import { Report } from '../models/report.model';
import { ReportDto } from 'reports/dtos/reports.dto';

@Injectable()
export class ReportRepository {
    async createReport(streamId: string, reportDto: ReportDto) {
        const report = new Report(undefined);
        report.setData(reportDto);
        report.createReport(streamId);
        return report;
    }

    async updateReport(streamId: string, reportDto: ReportDto) {
        const report = new Report(undefined);
        report.setData(reportDto);
        report.updateReport(streamId);
        return report;
    }

    async deleteReport(streamId: string, reportId: string) {
        const report = new Report(reportId);
        report.deleteReport(streamId);
        return report;
    }

    async welcomeReport(streamId: string, reportId: string) {
        const report = new Report(reportId);
        report.welcomeReport(streamId);
        return report;
    }
}
