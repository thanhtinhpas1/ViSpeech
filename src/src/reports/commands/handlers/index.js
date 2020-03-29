"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_report_handler_1 = require("./create-report.handler");
const delete_report_handler_1 = require("./delete-report.handler");
const update_report_handler_1 = require("./update-report.handler");
const welcome_report_handler_1 = require("./welcome-report.handler");
exports.CommandHandlers = [
    create_report_handler_1.CreateReportHandler,
    delete_report_handler_1.DeleteReportHandler,
    update_report_handler_1.UpdateReportHandler,
    welcome_report_handler_1.WelcomeReportHandler,
];
//# sourceMappingURL=index.js.map