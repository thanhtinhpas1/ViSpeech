import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ProjectDto, ProjectIdRequestParamsDto } from "../dtos/projects.dto";
import { GetProjectsQuery } from "projects/queries/impl/get-projects.query";
import { FindProjectQuery } from "projects/queries/impl/find-project.query";
import { GetProjectsByUserIdQuery } from "projects/queries/impl/get-projects-by-userId";
import { GetAcceptedProjectsByUserIdQuery } from "projects/queries/impl/get-accepted-projects-by-userId";
export declare class ProjectsService {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    createProject(streamId: string, projectDto: ProjectDto): Promise<any>;
    updateProject(streamId: string, projectDto: ProjectDto): Promise<any>;
    deleteProject(streamId: string, projectIdDto: ProjectIdRequestParamsDto): Promise<any>;
    getProjects(getProjectsQuery: GetProjectsQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    findOne(findProjectQuery: FindProjectQuery): Promise<ProjectDto>;
    getProjectsByUserId(getProjectsByUserIdQuery: GetProjectsByUserIdQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    getAcceptedProjectsByUserId(getAcceptedProjectsByUserIdQuery: GetAcceptedProjectsByUserIdQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
}
