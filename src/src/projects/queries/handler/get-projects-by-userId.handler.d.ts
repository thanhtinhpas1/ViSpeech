import { IQueryHandler } from '@nestjs/cqrs';
import { GetProjectsByUserIdQuery } from '../impl/get-projects-by-userId';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { Repository } from 'typeorm';
export declare class GetProjectsByUserIdHandler implements IQueryHandler<GetProjectsByUserIdQuery> {
    private readonly repository;
    constructor(repository: Repository<ProjectDto>);
    execute(query: GetProjectsByUserIdQuery): Promise<any>;
}
