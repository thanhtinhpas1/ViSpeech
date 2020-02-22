import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ReportUpdatedEvent } from "../impl/report-updated.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReportDto } from "reports/dtos/reports.dto";
import { Repository } from "typeorm";

@EventsHandler(ReportUpdatedEvent)
export class ReportUpdatedHandler implements IEventHandler<ReportUpdatedEvent> {
  constructor(
    @InjectRepository(ReportDto)
    private readonly repository: Repository<ReportDto>
  ) {}

  handle(event: ReportUpdatedEvent) {
    Logger.log(event, "ReportUpdatedEvent"); // write here
    const { id, ...reportInfo } = event.reportDto[0];
    this.repository.update(id, reportInfo);
  }
}
