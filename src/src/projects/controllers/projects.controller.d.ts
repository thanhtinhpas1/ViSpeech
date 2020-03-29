import { FindProjectQuery } from 'projects/queries/impl/find-project.query';
import { GetProjectsQuery } from 'projects/queries/impl/get-projects.query';
import { ProjectDto, ProjectIdRequestParamsDto } from '../dtos/projects.dto';
import { ProjectsService } from '../services/projects.service';
import { GetProjectsByUserIdQuery } from 'projects/queries/impl/get-projects-by-userId';
import { GetAcceptedProjectsByUserIdQuery } from 'projects/queries/impl/get-accepted-projects-by-userId';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    createProject(projectDto: ProjectDto): Promise<ProjectDto>;
    updateProject(projectIdDto: ProjectIdRequestParamsDto, projectDto: ProjectDto): Promise<any>;
    deleteProject(projectIdDto: ProjectIdRequestParamsDto): Promise<any>;
    getProjects(getProjectsQuery: GetProjectsQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    findOneProject(findProjectQuery: FindProjectQuery): Promise<ProjectDto>;
    getProjectsByUserId(getProjectsByUserIdQuery: GetProjectsByUserIdQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    getAcceptedProjectsByUserId(getAcceptedProjectsByUserIdQuery: GetAcceptedProjectsByUserIdQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
}
