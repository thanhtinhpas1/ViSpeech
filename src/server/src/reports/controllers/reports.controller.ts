import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'auth/roles.decorator';
import { CONSTANTS } from 'common/constant';
import { FindReportQuery } from 'reports/queries/impl/find-report.query';
import { GetReportsQuery } from 'reports/queries/impl/get-reports.query';
import { ReportDto, ReportIdRequestParamsDto } from '../dtos/reports.dto';
import { ReportsService } from '../services/reports.service';
import { AuthGuard } from '@nestjs/passport';
import { ReportQueryGuard } from 'auth/guards/report.guard';
import { GetStatisticsByIdQuery } from 'reports/queries/impl/get-statistics-by-id.query';
import { GetStatisticsParam } from 'reports/dtos/statistics.dto';
import { GetStatisticsByTokenTypeIdAndUserIdQuery } from 'reports/queries/impl/get-statistics-by-tokenTypeId-userId.query';
import { GetUserTotalStatisticsQuery } from 'reports/queries/impl/get-user-total-statistics.query';
import { GetAdminTotalStatisticsQuery } from 'reports/queries/impl/get-admin-total-statistics.query';
import { GetTotalStatisticsQuery } from 'reports/queries/impl/get-total-statistics.query';

@Controller('reports')
@UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
@ApiTags('Reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {
    }

    /* Create Report */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Create Report'] })
    @ApiResponse({ status: 200, description: 'Create Report.' })
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Post()
    async createReport(@Body() reportDto: ReportDto): Promise<ReportDto> {
        const streamId = reportDto._id;
        return this.reportsService.createReport(streamId, reportDto);
    }

    /* Update Report */
    // TODO: verify why we need to update report
    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Update Report'] })
    @ApiResponse({ status: 200, description: 'Update Report.' })
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Put(':_id')
    async updateReport(
        @Param() reportIdDto: ReportIdRequestParamsDto,
        @Body() reportDto: ReportDto
    ) {
        const streamId = reportIdDto._id;
        return this.reportsService.updateReport(streamId, {
            ...reportDto,
            _id: reportIdDto._id
        });
    }

    /* Delete Report */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Delete Report'] })
    @ApiResponse({ status: 200, description: 'Delete Report.' })
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Delete(':_id')
    async deleteReport(@Param() reportIdDto: ReportIdRequestParamsDto) {
        const streamId = reportIdDto._id;
        return this.reportsService.deleteReport(streamId, reportIdDto);
    }

    /* List Reports */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['List Reports'] })
    @ApiResponse({ status: 200, description: 'List Reports.' })
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Get()
    async findReports(@Query() getReportsQuery: GetReportsQuery) {
        return this.reportsService.findReports(getReportsQuery);
    }

    /* Get Statistics By Id */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Get Statistics By Id'] })
    @ApiResponse({ status: 200, description: 'Get Statistics By Id.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ReportQueryGuard)
    @Get('statistics-by-id/:id/:statisticsType/:timeType')
    async getStatisticsById(@Query() query: GetStatisticsByIdQuery,
                            @Param() param: GetStatisticsParam) {
        const { id, statisticsType, timeType } = param;
        query.id = id;
        query.statisticsType = statisticsType;
        query.timeType = timeType;
        return this.reportsService.getStatisticsById(query);
    }

    /* Get Statistics By TokenTypeId And UserId */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Get Statistics By TokenTypeId And UserId'] })
    @ApiResponse({ status: 200, description: 'Get Statistics By TokenTypeId And UserId.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ReportQueryGuard)
    @Get('user-token-type-statistics/:id/:userId/:timeType')
    async getStatisticalDataByTokenTypeIdAndUserId(@Query() query: GetStatisticsByTokenTypeIdAndUserIdQuery,
                                                   @Param() param: GetStatisticsParam) {
        const { id, userId, timeType } = param;
        query.id = id;
        query.userId = userId;
        query.timeType = timeType;
        return this.reportsService.getStatisticsByTokenTypeIdAndUserId(query);
    }

    /* Get Admin Total Statistics */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Get Admin Total Statistics'] })
    @ApiResponse({ status: 200, description: 'Get Admin Total Statistics.' })
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Get('admin-total-statistics/:statisticsType/:timeType')
    async getAdminTotalStatistics(@Query() query: GetAdminTotalStatisticsQuery,
                                  @Param() param: GetStatisticsParam) {
        const { statisticsType, timeType } = param;
        query.statisticsType = statisticsType;
        query.timeType = timeType;
        return this.reportsService.getAdminTotalStatistics(query);
    }

    /* Get User Total Statistics */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Get User Total Statistics'] })
    @ApiResponse({ status: 200, description: 'Get User Total Statistics.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ReportQueryGuard)
    @Get('user-total-statistics/:userId/:statisticsType/:timeType')
    async getUserTotalStatistics(@Query() query: GetUserTotalStatisticsQuery,
                                 @Param() param: GetStatisticsParam) {
        const { userId, statisticsType, timeType } = param;
        query.userId = userId;
        query.statisticsType = statisticsType;
        query.timeType = timeType;
        return this.reportsService.getUserTotalStatistics(query);
    }

    /* Get Total Statistics */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Get Total Statistics'] })
    @ApiResponse({ status: 200, description: 'Get Total Statistics.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ReportQueryGuard)
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Get('total-statistics/:timeType')
    async getTotalStatistics(@Query() query: GetTotalStatisticsQuery,
                             @Param() param: GetStatisticsParam) {
        const { timeType } = param;
        query.timeType = timeType;
        return this.reportsService.getTotalStatistics(query);
    }

    /* Find Report */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Get Report'] })
    @ApiResponse({ status: 200, description: 'Get Report.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ReportQueryGuard)
    @Get(':id')
    async findOneReport(@Param() findReportQuery: FindReportQuery) {
        return this.reportsService.findOne(findReportQuery);
    }
}
