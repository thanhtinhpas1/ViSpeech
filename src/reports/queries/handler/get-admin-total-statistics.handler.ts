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
        const { totalType, type } = query;
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
                data = ReportUtils.getTotalStatisticalData(groupedReports, data, 'tokenTypeId');
            } else if (totalType === CONSTANTS.TOTAL_STATISTICS_TYPE.USER) {
                const users = await this.userRepository.find();
                for (const user of users) {
                    data.push({ data: user, usedMinutes: 0 });
                }
                const groupedReports = await getMongoRepository(ReportDto).aggregate([
                    ReportUtils.aggregateBetweenDates(startDate, endDate),
                    {
                        $group: {
                            _id: {
                                userId: '$userId'
                            },
                            usedMinutes: { $sum: '$usedMinutes' }
                        }
                    }]).toArray();
                data = ReportUtils.getTotalStatisticalData(groupedReports, data, 'userId');
            }
            return data;
        } catch (error) {
            Logger.error(error, '', 'GetAdminTotalStatisticsQuery');
        }
    }
}
