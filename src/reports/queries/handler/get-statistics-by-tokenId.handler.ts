import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
import { ReportUtils } from 'utils/report.util';
import { GetStatisticsByTokenIdQuery } from '../impl/get-statistics-by-tokenId.query';

@QueryHandler(GetStatisticsByTokenIdQuery)
export class GetStatisticsByTokenIdHandler implements IQueryHandler<GetStatisticsByTokenIdQuery> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>,
    ) {
    }

    async execute(query: GetStatisticsByTokenIdQuery): Promise<any> {
        Logger.log('Async GetStatisticsByTokenIdQuery...', 'GetStatisticsByTokenIdQuery');
        const { id, type } = query;

        try {
            const queryParams = ReportUtils.getValidStatisticalQueryParams(query);
            const startDate = ReportUtils.getStartDate(type, queryParams);
            const endDate = ReportUtils.getEndDate(type, queryParams);
            let data = ReportUtils.prepareStatisticalData(type, queryParams);

            const reports = await this.repository.find({
                where: {
                    tokenId: id,
                    dateReport: {
                        $gte: new Date(startDate),
                        $lt: new Date(endDate)
                    },
                }
            });
            data = ReportUtils.getStatisticalData(type, data, reports);
            return data;
        } catch (error) {
            Logger.error(error, '', 'GetStatisticsByTokenIdQuery');
        }
    }
}