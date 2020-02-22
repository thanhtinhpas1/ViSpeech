import {Injectable} from '@nestjs/common';
import {Report} from '../models/report.model';

@Injectable()
export class ReportRepository {
    async createReport(reportDto) {
        const report = new Report(undefined);
        report.setData(reportDto);
        report.createReport();
        return report;
    }

    async updateReport(reportDto) {
        const report = new Report(reportDto.id);
        report.setData(reportDto);
        report.updateReport();
        return report;
    }

    async deleteReport(reportId) {
        const report = new Report(reportId);
        report.deleteReport();
        return report;
    }

    async welcomeReport(reportId) {
        const report = new Report(reportId);
        report.welcomeReport();
        return report;
    }
}
