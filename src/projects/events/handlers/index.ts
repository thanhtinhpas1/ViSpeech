import { ProjectCreatedHandler, ProjectCreatedFailedHandler, ProjectCreatedSuccessHandler } from "./project-created.handler";
import { ProjectUpdatedHandler } from "./project-updated.handler";
import { ProjectDeletedHandler } from "./project-deleted.handler";
import { ProjectWelcomedHandler } from "./project-welcomed.handler";

export const EventHandlers = [
  // create
  ProjectCreatedHandler,
  ProjectCreatedSuccessHandler,
  ProjectCreatedFailedHandler,

  ProjectUpdatedHandler,
  ProjectDeletedHandler,
  ProjectWelcomedHandler,
];
