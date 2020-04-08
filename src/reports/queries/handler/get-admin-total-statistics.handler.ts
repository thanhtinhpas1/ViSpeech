import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository, getMongoRepository } from 'typeorm';
import { ReportUtils } from 'utils/report.util';
import { GetAdminTotalStatisticsQuery } from '../impl/get-admin-total-statistics.query';
import { CONSTANTS } from 'common/constant';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { UserDto } from 'users/dtos/users.dto';

@QueryHandler(GetAdminTotalStatisticsQuery)
export class GetAdminTotalStatisticsHandler implements IQueryHandler<GetAdminTotalStatisticsQuery> {
    constructor(
        @InjectRepository(TokenTypeDto)
        private readonly tokenTypeRepository: Repository<TokenTypeDto>,
        @InjectRepository(TokenTypeDto)
        private readonly userRepository: Repository<UserDto>,
    ) {
    }

    async execute(query: GetAdminTotalStatisticsQuery): Promise<any> {
        Logger.log('Async GetAdminTotalStatisticsQuery...', 'GetAdminTotalStatisticsQuery');
        const { statisticsType, timeType } = query;
        let data = [];

        try {
            const queryParams = ReportUtils.getValidStatisticalQueryParams(query);
            const startDate = ReportUtils.getStartDate(timeType, queryParams);
            const endDate = ReportUtils.getEndDate(timeType, queryParams);

            let aggregateGroup = {
                $group: {
                    _id: {},
                    usedMinutes: { $sum: '$usedMinutes' }
                }
            }
            aggregateGroup.$group._id[`${statisticsType}Id`] = `$${statisticsType}Id`
            const groupedReports = await getMongoRepository(ReportDto).aggregate([
                ReportUtils.aggregateMatchDates(startDate, endDate),
                aggregateGroup
            ]).toArray();

            if (statisticsType === CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE) {
                const tokenTypes = await this.tokenTypeRepository.find();
                for (const tokenType of tokenTypes) {
                    data.push({ data: tokenType, usedMinutes: 0 });
                }
            } else if (statisticsType === CONSTANTS.STATISTICS_TYPE.USER) {
                const users = await this.userRepository.find();
                for (const user of users) {
                    data.push({ data: user, usedMinutes: 0 });
                }
            }

            data = ReportUtils.getTotalStatisticalData(groupedReports, data, `${statisticsType}Id`);
            return data;
        } catch (error) {
            Logger.error(error, '', 'GetAdminTotalStatisticsQuery');
        }
    }
}
