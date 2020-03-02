import { Injectable } from "@nestjs/common";
import { Report } from "../models/report.model";
import { ReportDto } from "reports/dtos/reports.dto";

@Injectable()
export class ReportRepository {
  async createReport(reportDto: ReportDto) {
    const report = new Report(undefined);
    report.setData(reportDto);
    report.createReport();
    return report;
  }

  async updateReport(reportDto: ReportDto) {
    const report = new Report(undefined);
    report.setData(reportDto);
    report.updateReport();
    return report;
  }

  async deleteReport(reportId: string) {
    const report = new Report(reportId);
    report.deleteReport();
    return report;
  }

  async welcomeReport(reportId: string) {
    const report = new Report(reportId);
    report.welcomeReport();
    return report;
  }
}
