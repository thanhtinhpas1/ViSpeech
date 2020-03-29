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
const cqrs_1 = require("@nestjs/cqrs");
const create_report_command_1 = require("../commands/impl/create-report.command");
const update_report_command_1 = require("../commands/impl/update-report.command");
const delete_report_command_1 = require("../commands/impl/delete-report.command");
const get_reports_query_1 = require("reports/queries/impl/get-reports.query");
const find_report_query_1 = require("reports/queries/impl/find-report.query");
let ReportsService = class ReportsService {
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    createReport(streamId, reportDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new create_report_command_1.CreateReportCommand(streamId, reportDto));
        });
    }
    updateReport(streamId, reportDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new update_report_command_1.UpdateReportCommand(streamId, reportDto));
        });
    }
    deleteReport(streamId, reportIdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new delete_report_command_1.DeleteReportCommand(streamId, reportIdDto));
        });
    }
    findReports(getReportsQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = new get_reports_query_1.GetReportsQuery();
            Object.assign(query, getReportsQuery);
            return yield this.queryBus.execute(query);
        });
    }
    findOne(findReportQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = new find_report_query_1.FindReportQuery(findReportQuery.id);
            return yield this.queryBus.execute(query);
        });
    }
};
ReportsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], ReportsService);
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map