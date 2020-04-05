import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
import { ReportUtils } from 'utils/report.util';
import { GetUserTotalStatisticsQuery } from '../impl/get-user-total-statistics.query';

@QueryHandler(GetUserTotalStatisticsQuery)
export class GetUserTotalStatisticsHandler implements IQueryHandler<GetUserTotalStatisticsQuery> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>,
    ) {
    }

    async execute(query: GetUserTotalStatisticsQuery): Promise<any> {
        Logger.log('Async GetUserTotalStatisticsQuery...', 'GetUserTotalStatisticsQuery');
        const { userId, type } = query;

        try {
            
        } catch (error) {
            Logger.error(error, '', 'GetUserTotalStatisticsQuery');
        }
    }
}
