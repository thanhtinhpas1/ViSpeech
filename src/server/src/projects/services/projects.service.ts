import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProjectDto, ProjectIdRequestParamsDto } from '../dtos/projects.dto';
import { CreateProjectCommand } from '../commands/impl/create-project.command';
import { UpdateProjectCommand } from '../commands/impl/update-project.command';
import { DeleteProjectCommand } from '../commands/impl/delete-project.command';
import { GetProjectsQuery } from 'projects/queries/impl/get-projects.query';
import { FindProjectQuery } from 'projects/queries/impl/find-project.query';
import { GetProjectsByUserIdQuery } from 'projects/queries/impl/get-projects-by-userId';
import { GetAcceptedProjectsByUserIdQuery } from 'projects/queries/impl/get-accepted-projects-by-userId';
import { GetProjectNamesQuery } from 'projects/queries/impl/get-project-names.query';

@Injectable()
export class ProjectsService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {
    }

    async createProject(streamId: string, projectDto: ProjectDto) {
        return await this.commandBus.execute(new CreateProjectCommand(streamId, projectDto));
    }

    async updateProject(streamId: string, projectDto: ProjectDto) {
        return await this.commandBus.execute(new UpdateProjectCommand(streamId, projectDto));
    }

    async deleteProject(streamId: string, projectIdDto: ProjectIdRequestParamsDto) {
        return await this.commandBus.execute(new DeleteProjectCommand(streamId, projectIdDto));
    }

    async getProjects(getProjectsQuery: GetProjectsQuery) {
        const query = new GetProjectsQuery();
        Object.assign(query, getProjectsQuery);
        return await this.queryBus.execute(query);
    }

    async getProjectNames(getProjectNamesQuery: GetProjectNamesQuery) {
        const query = new GetProjectNamesQuery();
        Object.assign(query, getProjectNamesQuery);
        return await this.queryBus.execute(query);
    }

    async findOne(findProjectQuery: FindProjectQuery): Promise<ProjectDto> {
        const query = new FindProjectQuery(findProjectQuery.id);
        Object.assign(query, findProjectQuery);
        return await this.queryBus.execute(query);
    }

    async getProjectsByUserId(getProjectsByUserIdQuery: GetProjectsByUserIdQuery) {
        const query = new GetProjectsByUserIdQuery(getProjectsByUserIdQuery.userId);
        Object.assign(query, getProjectsByUserIdQuery);
        return await this.queryBus.execute(query);
    }

    async getAcceptedProjectsByUserId(getAcceptedProjectsByUserIdQuery: GetAcceptedProjectsByUserIdQuery) {
        const query = new GetAcceptedProjectsByUserIdQuery(getAcceptedProjectsByUserIdQuery.userId);
        Object.assign(query, getAcceptedProjectsByUserIdQuery);
        return await this.queryBus.execute(query);
    }
}
