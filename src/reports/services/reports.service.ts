import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ReportDto, ReportIdRequestParamsDto } from "../dtos/reports.dto";
import { CreateReportCommand } from "../commands/impl/create-report.command";
import { UpdateReportCommand } from "../commands/impl/update-report.command";
import { DeleteReportCommand } from "../commands/impl/delete-report.command";
import { GetReportsQuery } from "reports/queries/impl/get-reports.query";
import { FindReportQuery } from "reports/queries/impl/find-report.query";

@Injectable()
export class ReportsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createReport(reportDto: ReportDto) {
    return await this.commandBus.execute(new CreateReportCommand(reportDto));
  }

  async updateReport(reportDto: ReportDto) {
    return await this.commandBus.execute(new UpdateReportCommand(reportDto));
  }

  async deleteReport(reportIdDto: ReportIdRequestParamsDto) {
    return await this.commandBus.execute(new DeleteReportCommand(reportIdDto));
  }

  async findReports(getReportsQuery: GetReportsQuery) {
    var query = new GetReportsQuery();
    Object.assign(query, getReportsQuery);
    return await this.queryBus.execute(query);
  }

  async findOne(findReportQuery: FindReportQuery): Promise<ReportDto> {
    var query = new FindReportQuery();
    Object.assign(query, findReportQuery);
    return await this.queryBus.execute(query);
  }
}
