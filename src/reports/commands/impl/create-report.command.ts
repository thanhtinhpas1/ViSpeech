import {ICommand} from '@nestjs/cqrs';
import {ReportDto} from '../../dtos/reports.dto';

export class CreateReportCommand implements ICommand {
  constructor(public readonly reportDto: ReportDto) {}
}
