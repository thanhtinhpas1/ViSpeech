import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
import { ReportUtils } from 'utils/report.util';
import { GetStatisticsByTokenTypeIdAndUserIdQuery } from '../impl/get-statistics-by-tokenTypeId-userId.query';

@QueryHandler(GetStatisticsByTokenTypeIdAndUserIdQuery)
export class GetStatisticsByTokenTypeIdAndUserIdHandler implements IQueryHandler<GetStatisticsByTokenTypeIdAndUserIdQuery> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>,
    ) {
    }

    async execute(query: GetStatisticsByTokenTypeIdAndUserIdQuery): Promise<any> {
        Logger.log('Async GetStatisticsByTokenTypeIdAndUserIdQuery...', 'GetStatisticsByTokenTypeIdAndUserIdQuery');
        const { id, userId, type } = query;

        try {
            const queryParams = ReportUtils.getValidStatisticalQueryParams(query);
            const startDate = ReportUtils.getStartDate(type, queryParams);
            const endDate = ReportUtils.getEndDate(type, queryParams);
            let data = ReportUtils.prepareStatisticalData(type, queryParams);

            const reports = await this.repository.find({ where: {
                userId,
                tokenTypeId: id,
                dateReport: {
                    $gte: new Date(startDate),
                    $lt: new Date(endDate)
                },
            } });
            data = ReportUtils.getStatisticalData(type, data, reports);
            return data;
        } catch (error) {
            Logger.error(error, '', 'GetStatisticsByTokenTypeIdAndUserIdQuery');
        }
    }
}
