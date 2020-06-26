import {ReportCreatedHandler, ReportCreatedSuccessHandler, ReportCreatedFailedHandler} from './report-created.handler';
import {ReportUpdatedHandler, ReportUpdatedSuccessHandler, ReportUpdatedFailedHandler} from './report-updated.handler';
import {ReportDeletedHandler, ReportDeletedSuccessHandler, ReportDeletedFailedHandler} from './report-deleted.handler';
import {ReportWelcomedHandler} from './report-welcomed.handler';

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