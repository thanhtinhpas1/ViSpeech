import { GetProjectsQuery } from '../impl/get-projects.query';
import { IQueryHandler } from '@nestjs/cqrs';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { Repository } from 'typeorm';
export declare class GetProjectsHandler implements IQueryHandler<GetProjectsQuery> {
    private readonly repository;
    constructor(repository: Repository<ProjectDto>);
    execute(query: GetProjectsQuery): Promise<ProjectDto[]>;
}
