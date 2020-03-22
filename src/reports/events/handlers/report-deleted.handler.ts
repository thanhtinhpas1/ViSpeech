import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ReportDeletedEvent } from "../impl/report-deleted.event";
import { Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReportDto } from "reports/dtos/reports.dto";
import { Repository } from "typeorm";

@EventsHandler(ReportDeletedEvent)
export class ReportDeletedHandler implements IEventHandler<ReportDeletedEvent> {
  constructor(
    @InjectRepository(ReportDto)
    private readonly repository: Repository<ReportDto>
  ) { }

  async handle(event: ReportDeletedEvent) {
    Logger.log(event.reportId, "ReportDeletedEvent");
    const { streamId, reportId } = event;

    try {
      const report = await this.repository.findOne({ _id: reportId });
      if (report) {
        await this.repository.delete({ _id: reportId });
        return;
      }
      throw new NotFoundException(`Report with _id ${reportId} does not exist.`);
    } catch (error) {
      Logger.error(error, "", "ReportDeletedEvent");
    }
  }
}
