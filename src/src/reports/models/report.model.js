"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const report_created_event_1 = require("../events/impl/report-created.event");
const report_updated_event_1 = require("../events/impl/report-updated.event");
const report_deleted_event_1 = require("../events/impl/report-deleted.event");
const report_welcomed_event_1 = require("../events/impl/report-welcomed.event");
class Report extends cqrs_1.AggregateRoot {
    constructor(id) {
        super();
        this.id = id;
    }
    setData(data) {
        this.data = data;
    }
    createReport(streamId) {
        this.apply(new report_created_event_1.ReportCreatedEvent(streamId, this.data));
    }
    updateReport(streamId) {
        this.apply(new report_updated_event_1.ReportUpdatedEvent(streamId, this.data));
    }
    welcomeReport(streamId) {
        this.apply(new report_welcomed_event_1.ReportWelcomedEvent(streamId, this.id));
    }
    deleteReport(streamId) {
        this.apply(new report_deleted_event_1.ReportDeletedEvent(streamId, this.id));
    }
}
exports.Report = Report;
//# sourceMappingURL=report.model.js.map