import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {FindReportQuery} from '../impl/find-report.query';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ReportDto} from 'reports/dtos/reports.dto';
import {Repository} from 'typeorm';

@QueryHandler(FindReportQuery)
export class FindReportHandler implements IQueryHandler<FindReportQuery> {
    constructor(@InjectRepository(ReportDto) private readonly repository: Repository<ReportDto>) {
    }

    execute(query: FindReportQuery): Promise<any> {
        Logger.log('ASync FindReportQuery...');
        return this.repository.findOne(query.id);
    }

}