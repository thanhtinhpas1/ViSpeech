import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {FindProjectQuery} from '../impl/find-project.query';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProjectDto} from 'projects/dtos/projects.dto';
import {Repository} from 'typeorm';

@QueryHandler(FindProjectQuery)
export class FindProjectHandler implements IQueryHandler<FindProjectQuery> {
    constructor(
        @InjectRepository(ProjectDto)
        private readonly repository: Repository<ProjectDto>
    ) {
    }

    async execute(query: FindProjectQuery): Promise<any> {
        Logger.log('Async FindProjectQuery...', 'FindProjectQuery');
        try {
            return await this.repository.findOne({ _id: query.id });
        } catch (error) {
            Logger.error(error, '', 'FindProjectQuery');
        }
    }
}
