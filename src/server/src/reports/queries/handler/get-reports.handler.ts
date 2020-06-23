import { GetReportsQuery } from '../impl/get-reports.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';

@QueryHandler(GetReportsQuery)
export class GetReportsHandler implements IQueryHandler<GetReportsQuery> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>
    ) {
    }

    async execute(query: GetReportsQuery) {
        Logger.log('Async GetReportsQuery...');
        const {limit, offset} = query;
        let reports = [];
        try {
            reports = limit != null && offset != null ?
                await this.repository.find({skip: offset, take: limit}) :
                await this.repository.find();
            const count = await this.repository.count();
            return {data: reports, count};
        } catch (error) {
            Logger.error(error.message, '', 'GetReportsQuery');
        }
    }
}
