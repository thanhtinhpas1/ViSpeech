import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
import { ReportUtils } from 'utils/report.util';
import { GetAdminTotalStatisticsQuery } from '../impl/get-admin-total-statistics.query';

@QueryHandler(GetAdminTotalStatisticsQuery)
export class GetAdminTotalStatisticsHandler implements IQueryHandler<GetAdminTotalStatisticsQuery> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>,
    ) {
    }

    async execute(query: GetAdminTotalStatisticsQuery): Promise<any> {
        Logger.log('Async GetAdminTotalStatisticsQuery...', 'GetAdminTotalStatisticsQuery');
        const { type } = query;

        try {
            
        } catch (error) {
            Logger.error(error, '', 'GetAdminTotalStatisticsQuery');
        }
    }
}
