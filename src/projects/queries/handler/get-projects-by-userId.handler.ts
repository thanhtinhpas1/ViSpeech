import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {GetProjectsByUserIdQuery} from '../impl/get-projects-by-userId';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProjectDto} from 'projects/dtos/projects.dto';
import {Repository} from 'typeorm';

@QueryHandler(GetProjectsByUserIdQuery)
export class GetProjectsByUserIdHandler
    implements IQueryHandler<GetProjectsByUserIdQuery> {
    constructor(
        @InjectRepository(ProjectDto)
        private readonly repository: Repository<ProjectDto>
    ) {
    }

    async execute(query: GetProjectsByUserIdQuery): Promise<any> {
        Logger.log('Async GetProjectsByUserIdQuery...', 'GetProjectsByUserIdQuery');
        const {userId, offset, limit} = query;
        try {
            if (limit && offset) {
                return await this.repository.find({
                    skip: offset,
                    take: limit,
                    where: {userId}
                });
            }
            return await this.repository.find({
                where: {userId}
            });
        } catch (error) {
            Logger.error(error, '', 'GetProjectsByUserIdQuery');
        }
    }
}
