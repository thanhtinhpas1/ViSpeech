import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {ProjectDto, ProjectIdRequestParamsDto} from '../dtos/projects.dto';
import {CreateProjectCommand} from '../commands/impl/create-project.command';
import {UpdateProjectCommand} from '../commands/impl/update-project.command';
import {DeleteProjectCommand} from '../commands/impl/delete-project.command';
import {GetProjectsQuery} from 'projects/queries/impl/get-projects.query';
import {FindProjectQuery} from 'projects/queries/impl/find-project.query';

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

    async findOne(findProjectQuery: FindProjectQuery): Promise<ProjectDto> {
        const query = new FindProjectQuery(findProjectQuery.id);
        return await this.queryBus.execute(query);
    }
}
