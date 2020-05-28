import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProjectsByUserIdQuery } from '../impl/get-projects-by-userId';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { Repository, getMongoRepository } from 'typeorm';
import { Utils } from 'utils';

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
        const { userId, offset, limit, filters, sort } = query;
        let projects = [];
        try {
            const findOptions = {
                where: { userId },
                order: {}
            }
            if (filters) {
                if (filters['name']) {
                    findOptions.where['name'] = new RegExp(filters['name'], 'i') 
                }
                if (filters['isValid']) {
                    findOptions.where['isValid'] = Utils.convertToBoolean(filters['isValid'])
                }
            }   
            if (sort) {
                const sortField = Utils.getCorrectSortField(sort.field)
                findOptions.order[sortField] = sort.order
            }

            projects = await this.repository.find({ skip: offset || 0, take: limit || 0, ...findOptions });
            const count = await getMongoRepository(ProjectDto).count(findOptions.where);
            return { data: projects, count };
        } catch (error) {
            Logger.error(error, '', 'GetProjectsByUserIdQuery');
        }
    }
}
