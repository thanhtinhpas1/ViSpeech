import { ICommand } from '@nestjs/cqrs';
import { ReportDto } from '../../dtos/reports.dto';
export declare class CreateReportCommand implements ICommand {
    readonly streamId: string;
    readonly reportDto: ReportDto;
    constructor(streamId: string, reportDto: ReportDto);
}
