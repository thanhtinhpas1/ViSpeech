import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { getMongoRepository, Repository } from 'typeorm';
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
        const {userId, statisticsType, timeType} = query;
        const data = [];

        try {
            const queryParams = ReportUtils.getValidStatisticalQueryParams(query);
            const startDate = ReportUtils.getStartDate(timeType, queryParams);
            const endDate = ReportUtils.getEndDate(timeType, queryParams);
            let reportType = statisticsType;
            if (statisticsType === CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE) {
                reportType = CONSTANTS.STATISTICS_TYPE.USER_TOKEN_TYPE;
            }
            const aggregateMatch = {
                $match: {
                    userId,
                    timeType,
                    reportType,
                    dateReport: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    }
                }
            }
            const aggregateGroup = {
                $group: {
                    _id: {
                        userId: '$userId'
                    },
                    usedMinutes: {$sum: '$usedMinutes'}
                }
            }
            aggregateGroup.$group._id[`${statisticsType}Id`] = `$${statisticsType}Id`
            const groupedReports = await getMongoRepository(ReportDto).aggregate([
                aggregateMatch,
                aggregateGroup
            ]).toArray();

            if (statisticsType === CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE) {
                const tokenTypes = await this.tokenTypeRepository.find();
                for (const tokenType of tokenTypes) {
                    data.push({data: tokenType, usedMinutes: 0});
                }
            } else if (statisticsType === CONSTANTS.STATISTICS_TYPE.TOKEN) {
                const tokens = await this.tokenRepository.find({userId});
                for (const token of tokens) {
                    data.push({data: token, usedMinutes: 0});
                }
            } else if (statisticsType === CONSTANTS.STATISTICS_TYPE.PROJECT) {
                const projects = await this.projectRepository.find({userId});
                for (const project of projects) {
                    data.push({data: project, usedMinutes: 0});
                }
            }

            return ReportUtils.getTotalStatisticalData(groupedReports, data, `${statisticsType}Id`);
        } catch (error) {
            Logger.error(error.message, '', 'GetUserTotalStatisticsQuery');
        }
    }
}
