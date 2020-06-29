import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
import { ReportUtils } from 'utils/report.util';
import { GetStatisticsByTokenTypeIdAndUserIdQuery } from '../impl/get-statistics-by-tokenTypeId-userId.query';
import { CONSTANTS } from 'common/constant';

@QueryHandler(GetStatisticsByTokenTypeIdAndUserIdQuery)
export class GetStatisticsByTokenTypeIdAndUserIdHandler implements IQueryHandler<GetStatisticsByTokenTypeIdAndUserIdQuery> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>,
    ) {
    }

    async execute(query: GetStatisticsByTokenTypeIdAndUserIdQuery): Promise<any> {
        Logger.log('Async GetStatisticsByTokenTypeIdAndUserIdQuery...', 'GetStatisticsByTokenTypeIdAndUserIdQuery');
        const {id, userId, timeType} = query;

        try {
            const queryParams = ReportUtils.getValidStatisticalQueryParams(query);
            const startDate = ReportUtils.getStartDate(timeType, queryParams);
            const endDate = ReportUtils.getEndDate(timeType, queryParams);
            const data = ReportUtils.prepareStatisticalData(timeType, queryParams);

            const reports = await this.repository.find({
                where: {
                    timeType,
                    reportType: CONSTANTS.STATISTICS_TYPE.USER_TOKEN_TYPE,
                    userId,
                    tokenTypeId: id,
                    dateReport: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    },
                }
            });

            return ReportUtils.getStatisticalData(timeType, data, reports);
        } catch (error) {
            Logger.error(error.message, '', 'GetStatisticsByTokenTypeIdAndUserIdQuery');
        }
    }
}
