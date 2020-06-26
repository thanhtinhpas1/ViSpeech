import { GetProjectsQuery } from '../impl/get-projects.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { Repository, getMongoRepository } from 'typeorm';
import { Utils } from 'utils';
import { UserDto } from 'users/dtos/users.dto';

@QueryHandler(GetProjectsQuery)
export class GetProjectsHandler implements IQueryHandler<GetProjectsQuery> {
    constructor(
        @InjectRepository(ProjectDto)
        private readonly repository: Repository<ProjectDto>,
        @InjectRepository(UserDto)
        private readonly userDtoRepository: Repository<UserDto>
    ) {
    }

    async execute(query: GetProjectsQuery) {
        Logger.log('Async GetProjectsHandler...', 'GetProjectsQuery');
        const { offset, limit, filters, sort } = query;
        let projects = [];
        let result = [];
        try {
            const findOptions = {
                where: {},
                order: {}
            }
            if (filters) {
                if (filters['_id']) {
                    findOptions.where['_id'] = new RegExp(filters['_id'], 'i')
                }
                if (filters['name']) {
                    findOptions.where['name'] = new RegExp(filters['name'], 'i')
                }
                if (filters['ownerName']) {
                    const users = await this.userDtoRepository.find({ where: { username: new RegExp(filters['ownerName'], 'i') } });
                    if (users.length > 0) {
                        const userIds = users.map(user => user._id)
                        findOptions.where['userId'] = { $in: [...userIds] }
                    }
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
            for (const project of projects) {
                const user = await this.userDtoRepository.findOne({ _id: project.userId.toString() });
                result.push({ ...project, ownerName: user.username });
            }

            const count = await getMongoRepository(ProjectDto).count(findOptions.where);
            return { data: result, count };
        } catch (error) {
            Logger.error(error, '', 'GetProjectsQuery');
        }
    }
}
