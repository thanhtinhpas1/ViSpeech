import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'auth/roles.decorator';
import {CONSTANTS} from 'common/constant';
import {FindReportQuery} from 'reports/queries/impl/find-report.query';
import {GetReportsQuery} from 'reports/queries/impl/get-reports.query';
import {ReportDto, ReportIdRequestParamsDto} from '../dtos/reports.dto';
import {ReportsService} from '../services/reports.service';
import {AuthGuard} from '@nestjs/passport';
import {ReportGuard} from 'auth/guards/report.guard';
import { GetStatisticsByProjectIdQuery } from 'reports/queries/impl/get-statistics-by-projectId.query';
import { GetStatisticsParam } from 'reports/dtos/statistics.dto';
import { GetStatisticsByTokenIdQuery } from 'reports/queries/impl/get-statistics-by-tokenId.query';
import { GetStatisticsByTokenTypeIdQuery } from 'reports/queries/impl/get-statistics-by-tokenTypeId.query';
import { GetStatisticsByTokenTypeIdAndUserIdQuery } from 'reports/queries/impl/get-statistics-by-tokenTypeId-userId.query';
import { GetUserTotalStatisticsQuery } from 'reports/queries/impl/get-user-total-statistics.query';
import { GetAdminTotalStatisticsQuery } from 'reports/queries/impl/get-admin-total-statistics.query';

@Controller('reports')
@UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ReportGuard)
@ApiTags('Reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {
    }

    /* Create Report */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Create Report']})
    @ApiResponse({status: 200, description: 'Create Report.'})
    @Post()
    async createReport(@Body() reportDto: ReportDto): Promise<ReportDto> {
        const streamId = reportDto._id;
        return this.reportsService.createReport(streamId, reportDto);
    }

    /* Update Report */
    // TODO: verify why we need to update report
    /*--------------------------------------------*/
    @ApiOperation({tags: ['Update Report']})
    @ApiResponse({status: 200, description: 'Update Report.'})
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
    @ApiOperation({tags: ['Delete Report']})
    @ApiResponse({status: 200, description: 'Delete Report.'})
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Delete(':_id')
    async deleteReport(@Param() reportIdDto: ReportIdRequestParamsDto) {
        const streamId = reportIdDto._id;
        return this.reportsService.deleteReport(streamId, reportIdDto);
    }

    /* List Reports */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['List Reports']})
    @ApiResponse({status: 200, description: 'List Reports.'})
    @Get()
    async findReports(@Query() getReportsQuery: GetReportsQuery) {
        return this.reportsService.findReports(getReportsQuery);
    }

    /* Find Report */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Get Report']})
    @ApiResponse({status: 200, description: 'Get Report.'})
    @Get(':id')
    async findOneReport(@Param() findReportQuery: FindReportQuery) {
        return this.reportsService.findOne(findReportQuery);
    }

    /* Get Statistics By ProjectId */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Get Statistics By ProjectId']})
    @ApiResponse({status: 200, description: 'Get Statistics By ProjectId.'})
    @Get('projectId/:id/:type')
    async getStatisticalDataByProjectId(@Query() query: GetStatisticsByProjectIdQuery,
    @Param() param: GetStatisticsParam) {
        const { id, type } = param;
        query.id = id;
        query.type = type;
        return this.reportsService.getStatisticsByProjectId(query);
    }

    /* Get Statistics By TokenId */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Get Statistics By TokenId']})
    @ApiResponse({status: 200, description: 'Get Statistics By TokenId.'})
    @Get('tokenId/:id/:type')
    async getStatisticalDataByTokenId(@Query() query: GetStatisticsByTokenIdQuery,
    @Param() param: GetStatisticsParam) {
        const { id, type } = param;
        query.id = id;
        query.type = type;
        return this.reportsService.getStatisticsByTokenId(query);
    }

    /* Get Statistics By TokenTypeId */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Get Statistics By TokenTypeId']})
    @ApiResponse({status: 200, description: 'Get Statistics By TokenTypeId.'})
    @Get('tokenTypeId/:id/:type')
    async getStatisticalDataByTokenTypeId(@Query() query: GetStatisticsByTokenTypeIdQuery,
    @Param() param: GetStatisticsParam) {
        const { id, type } = param;
        query.id = id;
        query.type = type;
        return this.reportsService.getStatisticsByTokenTypeId(query);
    }

    /* Get Statistics By TokenTypeId And UserId */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Get Statistics By TokenTypeId And UserId']})
    @ApiResponse({status: 200, description: 'Get Statistics By TokenTypeId And UserId.'})
    @Get('tokenTypeId-userId/:id/:userId/:type')
    async getStatisticalDataByTokenTypeIdAndUserId(@Query() query: GetStatisticsByTokenTypeIdAndUserIdQuery,
    @Param() param: GetStatisticsParam) {
        const { id, userId, type } = param;
        query.id = id;
        query.userId = userId;
        query.type = type;
        return this.reportsService.getStatisticsByTokenTypeIdAndUserId(query);
    }

    /* Get Admin Total Statistics */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Get Admin Total Statistics']})
    @ApiResponse({status: 200, description: 'Get Admin Total Statistics.'})
    @Get('admin-total-statistics/:totalType')
    async getAdminTotalStatistics(@Query() query: GetAdminTotalStatisticsQuery,
    @Param() param: GetStatisticsParam) {
        const { totalType } = param;
        query.type = totalType;
        return this.reportsService.getAdminTotalStatistics(query);
    }

    /* Get User Total Statistics */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Get User Total Statistics']})
    @ApiResponse({status: 200, description: 'Get User Total Statistics.'})
    @Get('user-total-statistics/:userId/:totalType')
    async getUserTotalStatistics(@Query() query: GetUserTotalStatisticsQuery,
    @Param() param: GetStatisticsParam) {
        const { userId, totalType } = param;
        query.type = totalType;
        query.userId = userId;
        return this.reportsService.getUserTotalStatistics(query);
    }
}
