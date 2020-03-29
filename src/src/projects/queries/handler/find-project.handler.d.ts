import { IQueryHandler } from '@nestjs/cqrs';
import { FindProjectQuery } from '../impl/find-project.query';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { Repository } from 'typeorm';
export declare class FindProjectHandler implements IQueryHandler<FindProjectQuery> {
    private readonly repository;
    constructor(repository: Repository<ProjectDto>);
    execute(query: FindProjectQuery): Promise<any>;
}
