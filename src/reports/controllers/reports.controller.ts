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
}
