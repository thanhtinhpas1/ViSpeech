import { ReportCreatedHandler } from "./report-created.handler";
import { ReportUpdatedHandler } from "./report-updated.handler";
import { ReportDeletedHandler } from "./report-deleted.handler";
import { ReportWelcomedHandler } from "./report-welcomed.handler";

export const EventHandlers = [
  ReportCreatedHandler,
  ReportUpdatedHandler,
  ReportDeletedHandler,
  ReportWelcomedHandler
];
