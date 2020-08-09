import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
import { ReportUtils } from 'utils/report.util';
import { GetStatisticsForAssignersQuery } from '../impl/get-statistics-for-assigners.query';
import { CONSTANTS } from 'common/constant';

@QueryHandler(GetStatisticsForAssignersQuery)
export class GetStatisticsForAssignersHandler implements IQueryHandler<GetStatisticsForAssignersQuery> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>,
    ) {
    }

    async execute(query: GetStatisticsForAssignersQuery): Promise<any> {
        Logger.log('Async GetStatisticsForAssignersQuery...', 'GetStatisticsForAssignersQuery');
        const { id, assignerId, assigneeId, tokenId, statisticsType, timeType } = query;

        try {
            const queryParams = ReportUtils.getValidStatisticalQueryParams(query);
            const startDate = ReportUtils.getStartDate(timeType, queryParams);
            const endDate = ReportUtils.getEndDate(timeType, queryParams);
            const data = ReportUtils.prepareStatisticalData(timeType, queryParams);

            const findOptions = {
                where: {
                    timeType,
                    reportType: statisticsType,
                    projectId: id,
                    assignerId,
                    assigneeId,
                    dateReport: {
                        $gte: new Date(startDate),
                        $lt: ReportUtils.nextDate(endDate)
                    },
                }
            };
            if (statisticsType === CONSTANTS.STATISTICS_TYPE.SHARED_TOKEN) {
                findOptions.where[`tokenId`] = tokenId;
            }

            const reports = await this.repository.find(findOptions);
            return ReportUtils.getStatisticalData(timeType, data, reports);
        } catch (error) {
            Logger.error(error.message, '', 'GetStatisticsForAssignersQuery');
        }
    }
}