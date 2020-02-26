import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ReportDeletedEvent } from "../impl/report-deleted.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReportDto } from "reports/dtos/reports.dto";
import { Repository } from "typeorm";

@EventsHandler(ReportDeletedEvent)
export class ReportDeletedHandler implements IEventHandler<ReportDeletedEvent> {
  constructor(
    @InjectRepository(ReportDto)
    private readonly repository: Repository<ReportDto>
  ) {}

  async handle(event: ReportDeletedEvent) {
    try {
      Logger.log(event, "ReportDeletedEvent");
      const reportId = event.reportId[0];
      return await this.repository.delete(reportId);
    } catch (error) {
      Logger.error(error, "ReportDeletedEvent");
    }
  }
}
