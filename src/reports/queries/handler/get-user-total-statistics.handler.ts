import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository, getMongoRepository } from 'typeorm';
import { ReportUtils } from 'utils/report.util';
import { GetUserTotalStatisticsQuery } from '../impl/get-user-total-statistics.query';
import { CONSTANTS } from 'common/constant';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';

@QueryHandler(GetUserTotalStatisticsQuery)
export class GetUserTotalStatisticsHandler implements IQueryHandler<GetUserTotalStatisticsQuery> {
    constructor(
        @InjectRepository(TokenTypeDto)
        private readonly tokenTypeRepository: Repository<TokenTypeDto>,
        @InjectRepository(TokenDto)
        private readonly tokenRepository: Repository<TokenDto>,
        @InjectRepository(ProjectDto)
        private readonly projectRepository: Repository<ProjectDto>,
    ) {
    }

    async execute(query: GetUserTotalStatisticsQuery): Promise<any> {
        Logger.log('Async GetUserTotalStatisticsQuery...', 'GetUserTotalStatisticsQuery');
        const { userId, totalType, type } = query;
        let data = [];

        try {
            const queryParams = ReportUtils.getValidStatisticalQueryParams(query);
            const startDate = ReportUtils.getStartDate(type, queryParams);
            const endDate = ReportUtils.getEndDate(type, queryParams);

            if (totalType === CONSTANTS.TOTAL_STATISTICS_TYPE.TOKEN_TYPE) {
                const tokenTypes = await this.tokenTypeRepository.find();
                for (const tokenType of tokenTypes) {
                    data.push({ data: tokenType, usedMinutes: 0 });
                }
                const groupedReports = await getMongoRepository(ReportDto).aggregate([
                    ReportUtils.aggregateBetweenDates(startDate, endDate),
                    {
                        $group: {
                            _id: {
                                tokenTypeId: '$tokenTypeId',
                                userId: '$userId'
                            },
                            usedMinutes: { $sum: '$usedMinutes' }
                        }
                    }]).toArray();
                console.log(groupedReports)
                data = ReportUtils.getTotalStatisticalData(groupedReports, data, 'tokenTypeId');
            } else if (totalType === CONSTANTS.TOTAL_STATISTICS_TYPE.TOKEN) {
                const tokens = await this.tokenRepository.find({ userId });
                for (const token of tokens) {
                    data.push({ data: token, usedMinutes: 0 });
                }
                const groupedReports = await getMongoRepository(ReportDto).aggregate([
                    ReportUtils.aggregateBetweenDates(startDate, endDate),
                    {
                        $group: {
                            _id: {
                                tokenId: '$tokenId',
                                userId: '$userId'
                            },
                            usedMinutes: { $sum: '$usedMinutes' }
                        }
                    }]).toArray();
                data = ReportUtils.getTotalStatisticalData(groupedReports, data, 'tokenId');
            } else if (totalType === CONSTANTS.TOTAL_STATISTICS_TYPE.PROJECT) {
                const projects = await this.projectRepository.find({ userId });
                for (const project of projects) {
                    data.push({ data: project, usedMinutes: 0 });
                }
                const groupedReports = await getMongoRepository(ReportDto).aggregate([
                    ReportUtils.aggregateBetweenDates(startDate, endDate),
                    {
                        $group: {
                            _id: {
                                projectId: '$projectId',
                                userId: '$userId'
                            },
                            usedMinutes: { $sum: '$usedMinutes' }
                        }
                    }]).toArray();
                data = ReportUtils.getTotalStatisticalData(groupedReports, data, 'projectId');
            }
            return data;
        } catch (error) {
            Logger.error(error, '', 'GetUserTotalStatisticsQuery');
        }
    }
}
