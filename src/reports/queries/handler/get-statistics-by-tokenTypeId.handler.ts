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
            const { fromDate, toDate, weekObj, monthObj, quarterObj, fromYear, toYear } = ReportUtils.getValidStatisticalQueryParams(query);
            let data = ReportUtils.prepareStatisticalData(type, fromDate, toDate, weekObj, monthObj, quarterObj, fromYear, toYear)
            const reports = await this.repository.find({ tokenTypeId: id });
            data = ReportUtils.getStatisticalData(type, data, reports);
            return data;
        } catch (error) {
            Logger.error(error, '', 'GetStatisticsByTokenTypeIdQuery');
        }
    }
}
