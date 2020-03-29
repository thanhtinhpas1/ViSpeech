"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("auth/roles.decorator");
const constant_1 = require("common/constant");
const find_report_query_1 = require("reports/queries/impl/find-report.query");
const get_reports_query_1 = require("reports/queries/impl/get-reports.query");
const reports_dto_1 = require("../dtos/reports.dto");
const reports_service_1 = require("../services/reports.service");
const passport_1 = require("@nestjs/passport");
const report_guard_1 = require("auth/guards/report.guard");
let ReportsController = class ReportsController {
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    createReport(reportDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = reportDto._id;
            return this.reportsService.createReport(streamId, reportDto);
        });
    }
    updateReport(reportIdDto, reportDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = reportIdDto._id;
            return this.reportsService.updateReport(streamId, Object.assign(Object.assign({}, reportDto), { _id: reportIdDto._id }));
        });
    }
    deleteReport(reportIdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = reportIdDto._id;
            return this.reportsService.deleteReport(streamId, reportIdDto);
        });
    }
    findReports(getReportsQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reportsService.findReports(getReportsQuery);
        });
    }
    findOneReport(findReportQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reportsService.findOne(findReportQuery);
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ tags: ['Create Report'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Create Report.' }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_dto_1.ReportDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "createReport", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Update Report'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Update Report.' }),
    common_1.Put(':_id'),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_dto_1.ReportIdRequestParamsDto,
        reports_dto_1.ReportDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "updateReport", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Delete Report'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Delete Report.' }),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN]),
    common_1.Delete(':_id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_dto_1.ReportIdRequestParamsDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "deleteReport", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['List Reports'] }),
    swagger_1.ApiResponse({ status: 200, description: 'List Reports.' }),
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_reports_query_1.GetReportsQuery]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "findReports", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Get Report'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Get Report.' }),
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_report_query_1.FindReportQuery]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "findOneReport", null);
ReportsController = __decorate([
    common_1.Controller('reports'),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), report_guard_1.ReportGuard),
    swagger_1.ApiTags('Reports'),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
exports.ReportsController = ReportsController;
//# sourceMappingURL=reports.controller.js.map