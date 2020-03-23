import { GetProjectsHandler } from "./get-projects.handler";
import { GetProjectsByUserIdHandler } from "./get-projects-by-userId.handler";
import { FindProjectHandler } from "./find-project.handler";

export const QueryHandlers = [
  GetProjectsHandler,
  GetProjectsByUserIdHandler,
  FindProjectHandler
];
