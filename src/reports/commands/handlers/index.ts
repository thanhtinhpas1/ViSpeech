import {CreateReportHandler} from './create-report.handler';
import {DeleteReportHandler} from './delete-report.handler';
import {UpdateReportHandler} from './update-report.handler';
import {WelcomeReportHandler} from './welcome-report.handler';

export const CommandHandlers = [
    CreateReportHandler,
    DeleteReportHandler,
    UpdateReportHandler,
    WelcomeReportHandler
];
