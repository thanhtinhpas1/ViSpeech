import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
import { GetStatisticsByProjectIdQuery } from '../impl/get-statistics-by-projectId.query';
import { ReportUtils } from 'utils/report.util';

@QueryHandler(GetStatisticsByProjectIdQuery)
export class GetStatisticsByProjectIdHandler implements IQueryHandler<GetStatisticsByProjectIdQuery> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>,
    ) {
    }

    async execute(query: GetStatisticsByProjectIdQuery): Promise<any> {
        Logger.log('Async GetStatisticsByProjectIdQuery...', 'GetStatisticsByProjectIdQuery');
        const { id, type } = query;

        try {
            const queryParams = ReportUtils.getValidStatisticalQueryParams(query);
            const startDate = ReportUtils.getStartDate(type, queryParams);
            const endDate = ReportUtils.getEndDate(type, queryParams);
            let data = ReportUtils.prepareStatisticalData(type, queryParams);

            const reports = await this.repository.find({
                where: {
                    projectId: id,
                    dateReport: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    },
                }
            });
            console.log("reports ", reports)
            console.log("data ", data)
            data = ReportUtils.getStatisticalData(type, data, reports);
            return data;
        } catch (error) {
            Logger.error(error, '', 'GetStatisticsByProjectIdQuery');
        }
    }
}