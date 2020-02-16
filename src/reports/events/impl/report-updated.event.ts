import { IEvent } from "@nestjs/cqrs";
import { ReportDto } from "../../dtos/reports.dto";

export class ReportUpdatedEvent implements IEvent {
  constructor(public readonly reportDto: ReportDto) {}
}
