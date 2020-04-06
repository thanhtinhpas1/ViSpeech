import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
import { ReportUtils } from 'utils/report.util';
import { GetStatisticsByTokenTypeIdQuery } from '../impl/get-statistics-by-tokenTypeId.query';

@QueryHandler(GetStatisticsByTokenTypeIdQuery)
export class GetStatisticsByTokenTypeIdHandler implements IQueryHandler<GetStatisticsByTokenTypeIdQuery> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>,
    ) {
    }

    async execute(query: GetStatisticsByTokenTypeIdQuery): Promise<any> {
        Logger.log('Async GetStatisticsByTokenTypeIdQuery...', 'GetStatisticsByTokenTypeIdQuery');
        const { id, type } = query;

        try {
            const queryParams = ReportUtils.getValidStatisticalQueryParams(query);
            const startDate = ReportUtils.getStartDate(type, queryParams);
            const endDate = ReportUtils.getEndDate(type, queryParams);
            let data = ReportUtils.prepareStatisticalData(type, queryParams);

            const reports = await this.repository.find({
                where: {
                    tokenTypeId: id,
                    dateReport: {
                        $gte: new Date(startDate),
                        $lt: new Date(endDate)
                    },
                }
            });
            data = ReportUtils.getStatisticalData(type, data, reports);
            return data;
        } catch (error) {
            Logger.error(error, '', 'GetStatisticsByTokenTypeIdQuery');
        }
    }
}
