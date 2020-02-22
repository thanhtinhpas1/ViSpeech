import {ICommand} from '@nestjs/cqrs';
import {ReportDto} from '../../dtos/reports.dto';

export class UpdateReportCommand implements ICommand {
  constructor(public readonly reportDto: ReportDto) {}
}
