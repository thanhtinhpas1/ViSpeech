import { GetProjectsHandler } from "./get-projects.handler";
import { GetProjectsByUserIdHandler } from "./get-projects-by-userId.handler";
import { FindProjectHandler } from "./find-project.handler";
import { GetAcceptedProjectsByUserIdHandler } from "./get-accepted-projects-by-userId.handler";

export const QueryHandlers = [
    GetProjectsHandler,
    GetProjectsByUserIdHandler,
    GetAcceptedProjectsByUserIdHandler,
    FindProjectHandler,
];
