"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const report_created_handler_1 = require("./report-created.handler");
const report_updated_handler_1 = require("./report-updated.handler");
const report_deleted_handler_1 = require("./report-deleted.handler");
const report_welcomed_handler_1 = require("./report-welcomed.handler");
exports.EventHandlers = [
    report_created_handler_1.ReportCreatedHandler,
    report_updated_handler_1.ReportUpdatedHandler,
    report_deleted_handler_1.ReportDeletedHandler,
    report_welcomed_handler_1.ReportWelcomedHandler
];
//# sourceMappingURL=index.js.map