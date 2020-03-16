import { IEvent } from "@nestjs/cqrs";
import { ReportDto } from "reports/dtos/reports.dto";

export class ReportCreatedEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly reportDto: ReportDto) {}
}
