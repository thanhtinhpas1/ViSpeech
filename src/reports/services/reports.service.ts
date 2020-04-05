import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {ReportDto, ReportIdRequestParamsDto} from '../dtos/reports.dto';
import {CreateReportCommand} from '../commands/impl/create-report.command';
import {UpdateReportCommand} from '../commands/impl/update-report.command';
import {DeleteReportCommand} from '../commands/impl/delete-report.command';
import {GetReportsQuery} from 'reports/queries/impl/get-reports.query';
import {FindReportQuery} from 'reports/queries/impl/find-report.query';
import { GetStatisticsByProjectIdQuery } from 'reports/queries/impl/get-statistics-by-projectId.query';
import { GetStatisticsByTokenTypeIdAndUserIdQuery } from 'reports/queries/impl/get-statistics-by-tokenTypeId-userId.query';
import { GetStatisticsByTokenTypeIdQuery } from 'reports/queries/impl/get-statistics-by-tokenTypeId.query';
import { GetStatisticsByTokenIdQuery } from 'reports/queries/impl/get-statistics-by-tokenId.query';
import { GetAdminTotalStatisticsQuery } from 'reports/queries/impl/get-admin-total-statistics.query';
import { GetUserTotalStatisticsQuery } from 'reports/queries/impl/get-user-total-statistics.query';

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
        var query = new FindReportQuery(findReportQuery.id);
        return await this.queryBus.execute(query);
    }

    async getStatisticsByProjectId(getStatisticsByProjectIdQuery: GetStatisticsByProjectIdQuery) {
        const { id, type } = getStatisticsByProjectIdQuery;
        var query = new GetStatisticsByProjectIdQuery(id, type);
        Object.assign(query, getStatisticsByProjectIdQuery);
        return await this.queryBus.execute(query);
    }

    async getStatisticsByTokenId(getStatisticsByTokenIdQuery: GetStatisticsByTokenIdQuery) {
        const { id, type } = getStatisticsByTokenIdQuery;
        var query = new GetStatisticsByTokenIdQuery(id, type);
        Object.assign(query, getStatisticsByTokenIdQuery);
        return await this.queryBus.execute(query);
    }

    async getStatisticsByTokenTypeId(getStatisticsByTokenTypeIdQuery: GetStatisticsByTokenTypeIdQuery) {
        const { id, type } = getStatisticsByTokenTypeIdQuery;
        var query = new GetStatisticsByTokenTypeIdQuery(id, type);
        Object.assign(query, getStatisticsByTokenTypeIdQuery);
        return await this.queryBus.execute(query);
    }

    async getStatisticsByTokenTypeIdAndUserId(getStatisticsByTokenTypeIdAndUserIdQuery: GetStatisticsByTokenTypeIdAndUserIdQuery) {
        const { id, userId, type } = getStatisticsByTokenTypeIdAndUserIdQuery;
        var query = new GetStatisticsByTokenTypeIdAndUserIdQuery(id, userId, type);
        Object.assign(query, getStatisticsByTokenTypeIdAndUserIdQuery);
        return await this.queryBus.execute(query);
    }

    async getAdminTotalStatistics(getAdminTotalStatisticsQuery: GetAdminTotalStatisticsQuery) {
        const { type } = getAdminTotalStatisticsQuery;
        var query = new GetAdminTotalStatisticsQuery(type);
        Object.assign(query, getAdminTotalStatisticsQuery);
        return await this.queryBus.execute(query);
    }

    async getUserTotalStatistics(getUserTotalStatisticsQuery: GetUserTotalStatisticsQuery) {
        const { userId, type } = getUserTotalStatisticsQuery;
        var query = new GetUserTotalStatisticsQuery(userId, type);
        Object.assign(query, getUserTotalStatisticsQuery);
        return await this.queryBus.execute(query);
    }
}
