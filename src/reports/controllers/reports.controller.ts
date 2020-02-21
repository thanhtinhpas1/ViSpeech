import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  Query
} from "@nestjs/common";
import { ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";
import { ReportIdRequestParamsDto } from "../dtos/reports.dto";
import { ReportDto } from "../dtos/reports.dto";
import { ReportsService } from "../services/reports.service";
import { GetReportsQuery } from 'reports/queries/impl/get-reports.query';
import { FindReportQuery } from 'reports/queries/impl/find-report.query';

@Controller("reports")
@ApiTags("Reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  /* Create Report */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Create Report"] })
  @ApiResponse({ status: 200, description: "Create Report." })
  @Post()
  async createReport(@Body() reportDto: ReportDto): Promise<ReportDto> {
    return this.reportsService.createReport(reportDto);
  }

  /* Update Report */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Update Report"] })
  @ApiResponse({ status: 200, description: "Update Report." })
  @Put(":id")
  async updateReport(
    @Param() reportIdDto: ReportIdRequestParamsDto,
    @Body() reportDto: ReportDto
  ) {
    return this.reportsService.updateReport({
      id: reportIdDto.id,
      ...reportDto
    });
  }

  /* Delete Report */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Delete Report"] })
  @ApiResponse({ status: 200, description: "Delete Report." })
  @Delete(":id")
  async deleteReport(@Param() reportIdDto: ReportIdRequestParamsDto) {
    return this.reportsService.deleteReport(reportIdDto);
  }

  /* List Reports */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['List Reports'] })
  @ApiResponse({ status: 200, description: 'List Reports.' })
  @Get()
  async findReports(@Query() getReportsQuery: GetReportsQuery) {
    return this.reportsService.findReports(getReportsQuery);
  }

  /* Find Report */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Get Report'] })
  @ApiResponse({ status: 200, description: 'Get Report.' })
  @Get(':id')
  async findOneReport(@Param() findReportQuery: FindReportQuery) {
    return this.reportsService.findOne(findReportQuery);
  }
}
