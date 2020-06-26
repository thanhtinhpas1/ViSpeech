import {
    ReportCreatedFailedHandler,
    ReportCreatedHandler,
    ReportCreatedSuccessHandler
} from './report-created.handler';
import {
    ReportUpdatedFailedHandler,
    ReportUpdatedHandler,
    ReportUpdatedSuccessHandler
} from './report-updated.handler';
import {
    ReportDeletedFailedHandler,
    ReportDeletedHandler,
    ReportDeletedSuccessHandler
} from './report-deleted.handler';
import { ReportWelcomedHandler } from './report-welcomed.handler';

export const EventHandlers = [
    // create
    ReportCreatedHandler,
    ReportCreatedSuccessHandler,
    ReportCreatedFailedHandler,

    // update
    ReportUpdatedHandler,
    ReportUpdatedSuccessHandler,
    ReportUpdatedFailedHandler,

    // delete
    ReportDeletedHandler,
    ReportDeletedSuccessHandler,
    ReportDeletedFailedHandler,

    ReportWelcomedHandler
];