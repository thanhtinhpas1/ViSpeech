import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { getMongoRepository, Repository } from 'typeorm';
import { Utils } from 'utils';
import { GetProjectNamesQuery } from '../impl/get-project-names.query';
import { ProjectDto } from 'projects/dtos/projects.dto';

@QueryHandler(GetProjectNamesQuery)
export class GetProjectNamesHandler implements IQueryHandler<GetProjectNamesQuery> {
    constructor(
        @InjectRepository(ProjectDto) private readonly repository: Repository<ProjectDto>
    ) {
    }

    async execute(query: GetProjectNamesQuery) {
        Logger.log('Async GetProjectNamesQuery...', 'GetProjectNamesQuery');
        const {limit, offset, filters} = query;
        try {
            const findOptions = {
                where: {},
                order: {}
            }
            if (filters) {
                if (filters['isValid']) {
                    findOptions.where['isValid'] = Utils.convertToBoolean(filters['isValid'])
                }
            }
            const projects = await this.repository.find({skip: offset || 0, take: limit || 0, ...findOptions});
            const data = projects.map(project => {
                return {
                    _id: project._id,
                    name: project.name
                }
            });
            const count = await getMongoRepository(ProjectDto).count(findOptions.where);
            return {data, count};
        } catch (error) {
            Logger.error(error, '', 'GetProjectNamesQuery');
        }
    }
}
