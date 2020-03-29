import { ProjectCreatedHandler, ProjectCreatedSuccessHandler } from './project-created.handler';
import { ProjectUpdatedHandler } from './project-updated.handler';
import { ProjectDeletedHandler } from './project-deleted.handler';
import { ProjectWelcomedHandler } from './project-welcomed.handler';
export declare const EventHandlers: (typeof ProjectCreatedHandler | typeof ProjectCreatedSuccessHandler | typeof ProjectUpdatedHandler | typeof ProjectDeletedHandler | typeof ProjectWelcomedHandler)[];
