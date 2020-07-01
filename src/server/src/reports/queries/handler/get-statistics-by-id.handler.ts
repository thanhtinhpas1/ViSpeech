import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
import { GetStatisticsByIdQuery } from '../impl/get-statistics-by-id.query';
import { ReportUtils } from 'utils/report.util';

@QueryHandler(GetStatisticsByIdQuery)
export class GetStatisticsByIdHandler implements IQueryHandler<GetStatisticsByIdQuery> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>,
    ) {
    }

    async execute(query: GetStatisticsByIdQuery): Promise<any> {
        Logger.log('Async GetStatisticsByIdQuery...', 'GetStatisticsByIdQuery');
        const {id, statisticsType, timeType} = query;

        try {
            const queryParams = ReportUtils.getValidStatisticalQueryParams(query);
            const startDate = ReportUtils.getStartDate(timeType, queryParams);
            const endDate = ReportUtils.getEndDate(timeType, queryParams);
            const data = ReportUtils.prepareStatisticalData(timeType, queryParams);

            const findOptions = {
                where: {
                    timeType,
                    reportType: statisticsType,
                    dateReport: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    },
                }
            }
            findOptions.where[`${statisticsType}Id`] = id
            const reports = await this.repository.find(findOptions);
            return ReportUtils.getStatisticalData(timeType, data, reports);
        } catch (error) {
            Logger.error(error.message, '', 'GetStatisticsByIdQuery');
        }
    }
}