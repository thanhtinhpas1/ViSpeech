import { ICommand } from '@nestjs/cqrs';
import { ReportIdRequestParamsDto } from '../../dtos/reports.dto';

export class DeleteReportCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly reportIdDto: ReportIdRequestParamsDto) {
    }
}
