import { GetProjectsQuery } from '../impl/get-projects.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { Repository } from 'typeorm';

@QueryHandler(GetProjectsQuery)
export class GetProjectsHandler implements IQueryHandler<GetProjectsQuery> {
    constructor(
        @InjectRepository(ProjectDto)
        private readonly repository: Repository<ProjectDto>
    ) {
    }

    async execute(query: GetProjectsQuery) {
        Logger.log('Async GetProjectsHandler...', 'GetProjectsQuery');
        const { offset, limit } = query;
        let projects = [];
        try {
            projects = limit != null && offset != null ?
                await this.repository.find({ skip: offset, take: limit }) :
                await this.repository.find();
            const count = await this.repository.count();
            return { data: projects, count };
        } catch (error) {
            Logger.error(error, '', 'GetProjectsQuery');
        }
    }
}
