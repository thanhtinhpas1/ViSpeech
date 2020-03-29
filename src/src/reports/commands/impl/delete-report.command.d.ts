import { ICommand } from '@nestjs/cqrs';
import { ReportIdRequestParamsDto } from '../../dtos/reports.dto';
export declare class DeleteReportCommand implements ICommand {
    readonly streamId: string;
    readonly reportIdDto: ReportIdRequestParamsDto;
    constructor(streamId: string, reportIdDto: ReportIdRequestParamsDto);
}
