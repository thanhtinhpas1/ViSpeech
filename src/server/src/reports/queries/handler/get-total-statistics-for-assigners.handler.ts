import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { getMongoRepository, Repository } from 'typeorm';
import { ReportUtils } from 'utils/report.util';
import { CONSTANTS } from 'common/constant';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { GetTotalStatisticsForAssignersQuery } from '../impl/get-total-statistics-for-assigners.query';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { UserDto } from 'users/dtos/users.dto';

@QueryHandler(GetTotalStatisticsForAssignersQuery)
export class GetTotalStatisticsForAssignersHandler implements IQueryHandler<GetTotalStatisticsForAssignersQuery> {
    constructor(
        @InjectRepository(PermissionDto)
        private readonly permissionRepository: Repository<PermissionDto>,
        @InjectRepository(TokenDto)
        private readonly tokenRepository: Repository<TokenDto>,
        @InjectRepository(UserDto)
        private readonly userRepository: Repository<UserDto>,
    ) {
    }

    async execute(query: GetTotalStatisticsForAssignersQuery): Promise<any> {
        Logger.log('Async GetTotalStatisticsForAssignersQuery...', 'GetTotalStatisticsForAssignersQuery');
        const { assignerId, projectId, statisticsType, timeType } = query;
        const data = [];

        try {
            const queryParams = ReportUtils.getValidStatisticalQueryParams(query);
            const startDate = ReportUtils.getStartDate(timeType, queryParams);
            const endDate = ReportUtils.getEndDate(timeType, queryParams);

            const aggregateMatch = {
                $match: {
                    assignerId,
                    projectId,
                    timeType,
                    reportType: statisticsType,
                    dateReport: {
                        $gte: new Date(startDate),
                        $lt: ReportUtils.nextDate(endDate)
                    }
                }
            };
            const aggregateGroup = {
                $group: {
                    _id: {
                        assignerId: '$assignerId',
                        projectId: '$projectId'
                    },
                    usedMinutes: { $sum: '$usedMinutes' },
                    totalRequests: { $sum: '$totalRequests' }
                }
            };
            if (statisticsType === CONSTANTS.STATISTICS_TYPE.USER) {
                aggregateGroup.$group._id[`assigneeId`] = `$assigneeId`;
            } else if (statisticsType === CONSTANTS.STATISTICS_TYPE.TOKEN) {
                aggregateGroup.$group._id[`tokenId`] = `$tokenId`;
            }
            const groupedReports = await getMongoRepository(ReportDto).aggregate([
                aggregateMatch,
                aggregateGroup
            ]).toArray();

            let groupKey = '';
            if (statisticsType === CONSTANTS.STATISTICS_TYPE.USER) {
                groupKey = 'assigneeId';
                const permissions = await this.permissionRepository.find({ projectId, assignerId, status: CONSTANTS.STATUS.ACCEPTED });
                const assignees = [];
                for (const permission of permissions) {
                    const user = await this.userRepository.findOne({ _id: permission.assigneeId });
                    assignees.push({ _id: user._id, username: user.username });
                }
                for (const assignee of assignees) {
                    data.push({ data: assignee, usedMinutes: 0, totalRequests: 0 });
                }
            } else if (statisticsType === CONSTANTS.STATISTICS_TYPE.TOKEN) {
                groupKey = 'tokenId';
                const tokens = await this.tokenRepository.find({ userId: assignerId, projectId, isValid: true });
                for (const token of tokens) {
                    data.push({ data: { _id: token._id, name: token.name }, usedMinutes: 0, totalRequests: 0 });
                }
            }

            return ReportUtils.getTotalStatisticalData(groupedReports, data, groupKey);
        } catch (error) {
            Logger.error(error.message, '', 'GetTotalStatisticsForAssignersQuery');
        }
    }
}
