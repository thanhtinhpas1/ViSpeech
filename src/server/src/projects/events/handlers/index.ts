import {
    ProjectCreatedFailedHandler,
    ProjectCreatedHandler,
    ProjectCreatedSuccessHandler
} from './project-created.handler';
import {
    ProjectUpdatedFailedHandler,
    ProjectUpdatedHandler,
    ProjectUpdatedSuccessHandler
} from './project-updated.handler';
import {
    ProjectDeletedFailedHandler,
    ProjectDeletedHandler,
    ProjectDeletedSuccessHandler
} from './project-deleted.handler';
import { ProjectWelcomedHandler } from './project-welcomed.handler';
import {
    ProjectDeletedByUserIdFailedHandler,
    ProjectDeletedByUserIdHandler,
    ProjectDeletedByUserIdSuccessHandler
} from './project-deleted-by-userId.handler';

export const EventHandlers = [
    // create
    ProjectCreatedHandler,
    ProjectCreatedSuccessHandler,
    ProjectCreatedFailedHandler,

    // update
    ProjectUpdatedHandler,
    ProjectUpdatedSuccessHandler,
    ProjectUpdatedFailedHandler,

    // delete
    ProjectDeletedHandler,
    ProjectDeletedSuccessHandler,
    ProjectDeletedFailedHandler,

    // delete by userId
    ProjectDeletedByUserIdHandler,
    ProjectDeletedByUserIdSuccessHandler,
    ProjectDeletedByUserIdFailedHandler,

    ProjectWelcomedHandler,
];
