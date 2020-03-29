import { ReportCreatedHandler } from './report-created.handler';
import { ReportUpdatedHandler } from './report-updated.handler';
import { ReportDeletedHandler } from './report-deleted.handler';
import { ReportWelcomedHandler } from './report-welcomed.handler';
export declare const EventHandlers: (typeof ReportCreatedHandler | typeof ReportUpdatedHandler | typeof ReportDeletedHandler | typeof ReportWelcomedHandler)[];
