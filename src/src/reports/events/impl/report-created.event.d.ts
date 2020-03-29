import { IEvent } from '@nestjs/cqrs';
import { ReportDto } from 'reports/dtos/reports.dto';
export declare class ReportCreatedEvent implements IEvent {
    readonly streamId: string;
    readonly reportDto: ReportDto;
    constructor(streamId: string, reportDto: ReportDto);
}
