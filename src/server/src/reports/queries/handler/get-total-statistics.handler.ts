import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ReportDto } from 'reports/dtos/reports.dto';
import { getMongoRepository } from 'typeorm';
import { ReportUtils } from 'utils/report.util';
import { GetTotalStatisticsQuery } from '../impl/get-total-statistics.query';

@QueryHandler(GetTotalStatisticsQuery)
export class GetTotalStatisticsHandler implements IQueryHandler<GetTotalStatisticsQuery> {
    constructor() {
    }

    async execute(query: GetTotalStatisticsQuery): Promise<any> {
        Logger.log('Async GetTotalStatisticsQuery...', 'GetTotalStatisticsQuery');
        const {statisticsType, timeType} = query;

        try {
            const queryParams = ReportUtils.getValidStatisticalQueryParams(query);
            const startDate = ReportUtils.getStartDate(timeType, queryParams);
            const endDate = ReportUtils.getEndDate(timeType, queryParams);
            const data = ReportUtils.prepareStatisticalData(timeType, queryParams);

            const aggregateMatch = {
                $match: {
                    timeType,
                    reportType: statisticsType,
                    dateReport: {
                        $gte: new Date(startDate),
                        $lt: ReportUtils.nextDate(endDate)
                    }
                }
            }
            const aggregateGroup = {
                $group: {
                    _id: {
                        dateReport: '$dateReport'
                    },
                    usedMinutes: {$sum: '$usedMinutes'},
                    totalRequests: {$sum: '$totalRequests'}
                }
            }
            const groupedReports = await getMongoRepository(ReportDto).aggregate([
                aggregateMatch,
                aggregateGroup
            ]).toArray();
            return ReportUtils.getTotalData(groupedReports, data, timeType);
        } catch (error) {
            Logger.error(error.message, '', 'GetTotalStatisticsQuery');
        }
    }
}
