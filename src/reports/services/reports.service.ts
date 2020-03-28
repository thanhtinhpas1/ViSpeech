import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {ReportDto, ReportIdRequestParamsDto} from '../dtos/reports.dto';
import {CreateReportCommand} from '../commands/impl/create-report.command';
import {UpdateReportCommand} from '../commands/impl/update-report.command';
import {DeleteReportCommand} from '../commands/impl/delete-report.command';
import {GetReportsQuery} from 'reports/queries/impl/get-reports.query';
import {FindReportQuery} from 'reports/queries/impl/find-report.query';

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
}
