import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ReportDto, ReportIdRequestParamsDto } from '../dtos/reports.dto';
import { CreateReportCommand } from '../commands/impl/create-report.command';
import { UpdateReportCommand } from '../commands/impl/update-report.command';
import { DeleteReportCommand } from '../commands/impl/delete-report.command';
import { GetReportsQuery } from 'reports/queries/impl/get-reports.query';
import { FindReportQuery } from 'reports/queries/impl/find-report.query';
import { GetStatisticsByIdQuery } from 'reports/queries/impl/get-statistics-by-id.query';
import { GetStatisticsByTokenTypeIdAndUserIdQuery } from 'reports/queries/impl/get-statistics-by-tokenTypeId-userId.query';
import { GetAdminTotalStatisticsQuery } from 'reports/queries/impl/get-admin-total-statistics.query';
import { GetUserTotalStatisticsQuery } from 'reports/queries/impl/get-user-total-statistics.query';
import { GetTotalStatisticsQuery } from 'reports/queries/impl/get-total-statistics.query';

@Injectable()
export class ReportsService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {
    }

    async createReport(streamId: string, reportDto: ReportDto) {
        return await this.commandBus.execute(new CreateReportCommand(streamId, reportDto));
    }

    async updateReport(streamId: string, reportDto: ReportDto) {
        return await this.commandBus.execute(new UpdateReportCommand(streamId, reportDto));
    }

    async deleteReport(streamId: string, reportIdDto: ReportIdRequestParamsDto) {
        return await this.commandBus.execute(new DeleteReportCommand(streamId, reportIdDto));
    }

    async findReports(getReportsQuery: GetReportsQuery) {
        var query = new GetReportsQuery();
        Object.assign(query, getReportsQuery);
        return await this.queryBus.execute(query);
    }

    async findOne(findReportQuery: FindReportQuery): Promise<ReportDto> {
        const query = new FindReportQuery(findReportQuery.id);
        return await this.queryBus.execute(query);
    }

    async getStatisticsById(getStatisticsByIdQuery: GetStatisticsByIdQuery) {
        const {id, statisticsType, timeType} = getStatisticsByIdQuery;
        const query = new GetStatisticsByIdQuery(id, statisticsType, timeType);
        Object.assign(query, getStatisticsByIdQuery);
        return await this.queryBus.execute(query);
    }

    async getStatisticsByTokenTypeIdAndUserId(getStatisticsByTokenTypeIdAndUserIdQuery: GetStatisticsByTokenTypeIdAndUserIdQuery) {
        const {id, userId, timeType} = getStatisticsByTokenTypeIdAndUserIdQuery;
        const query = new GetStatisticsByTokenTypeIdAndUserIdQuery(id, userId, timeType);
        Object.assign(query, getStatisticsByTokenTypeIdAndUserIdQuery);
        return await this.queryBus.execute(query);
    }

    async getAdminTotalStatistics(getAdminTotalStatisticsQuery: GetAdminTotalStatisticsQuery) {
        const {statisticsType, timeType} = getAdminTotalStatisticsQuery;
        const query = new GetAdminTotalStatisticsQuery(statisticsType, timeType);
        Object.assign(query, getAdminTotalStatisticsQuery);
        return await this.queryBus.execute(query);
    }

    async getUserTotalStatistics(getUserTotalStatisticsQuery: GetUserTotalStatisticsQuery) {
        const {userId, statisticsType, timeType} = getUserTotalStatisticsQuery;
        const query = new GetUserTotalStatisticsQuery(userId, statisticsType, timeType);
        Object.assign(query, getUserTotalStatisticsQuery);
        return await this.queryBus.execute(query);
    }

    async getTotalStatistics(getTotalStatisticsQuery: GetTotalStatisticsQuery) {
        const {timeType} = getTotalStatisticsQuery;
        const query = new GetTotalStatisticsQuery(timeType);
        Object.assign(query, getTotalStatisticsQuery);
        return await this.queryBus.execute(query);
    }
}
