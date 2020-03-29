import { ICommand } from '@nestjs/cqrs';
import { ReportDto } from '../../dtos/reports.dto';
export declare class UpdateReportCommand implements ICommand {
    readonly streamId: string;
    readonly reportDto: ReportDto;
    constructor(streamId: string, reportDto: ReportDto);
}
