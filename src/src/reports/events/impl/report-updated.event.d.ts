import { IEvent } from '@nestjs/cqrs';
import { ReportDto } from '../../dtos/reports.dto';
export declare class ReportUpdatedEvent implements IEvent {
    readonly streamId: string;
    readonly reportDto: ReportDto;
    constructor(streamId: string, reportDto: ReportDto);
}
