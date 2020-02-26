import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ReportCreatedEvent } from "../impl/report-created.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReportDto } from "reports/dtos/reports.dto";
import { Repository } from "typeorm";

@EventsHandler(ReportCreatedEvent)
export class ReportCreatedHandler implements IEventHandler<ReportCreatedEvent> {
  constructor(
    @InjectRepository(ReportDto)
    private readonly repository: Repository<ReportDto>
  ) {}

  async handle(event: ReportCreatedEvent) {
    try {
      Logger.log(event, "ReportCreatedEvent");
      const report = event.reportDto[0];
      return await this.repository.save(report);
    } catch (error) {
      Logger.error(error, "ReportCreatedEvent");
    }
  }
}
