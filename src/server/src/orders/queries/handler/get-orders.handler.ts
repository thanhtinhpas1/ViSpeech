import { GetOrdersQuery } from '../impl/get-orders.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'orders/dtos/orders.dto';
import { getMongoRepository, Repository } from 'typeorm';
import { Utils } from 'utils';
import { UserDto } from 'users/dtos/users.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
    constructor(
        @InjectRepository(OrderDto)
        private readonly repository: Repository<OrderDto>,
        @InjectRepository(UserDto)
        private readonly userDtoRepository: Repository<UserDto>,
        @InjectRepository(ProjectDto)
        private readonly projectDtoRepository: Repository<ProjectDto>
    ) {
    }

    async execute(query: GetOrdersQuery) {
        Logger.log('Async GetOrdersQuery...', 'GetOrdersQuery');
        const {offset, limit, filters, sort} = query;
        let orders = [];
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
                if (filters['status']) {
                    findOptions.where['status'] = filters['status']
                }
                if (filters['tokenType']) {
                    findOptions.where['tokenType.name'] = filters['tokenType']
                }
                if (filters['username']) {
                    const users = await this.userDtoRepository.find({where: {username: new RegExp(filters['username'], 'i')}});
                    if (users.length > 0) {
                        const userIds = users.map(user => user._id)
                        findOptions.where['userId'] = {$in: [...userIds]}
                    }
                }
                if (filters['projectName']) {
                    const projects = await this.projectDtoRepository.find({where: {name: new RegExp(filters['projectName'], 'i')}});
                    if (projects.length > 0) {
                        const projectIds = projects.map(project => project._id)
                        findOptions.where['token.projectId'] = {$in: [...projectIds]}
                    }
                }
            }
            if (sort) {
                const sortField = Utils.getCorrectSortField(sort.field)
                findOptions.order[sortField] = sort.order
            }

            orders = await this.repository.find({skip: offset || 0, take: limit || 0, ...findOptions});
            for (const order of orders) {
                const user = await this.userDtoRepository.findOne({_id: order.userId.toString()});
                const project = await this.projectDtoRepository.findOne({_id: order.token.projectId.toString()});
                result.push({...order, username: user.username, projectName: project.name,});
            }

            const count = await getMongoRepository(OrderDto).count(findOptions.where);
            return {data: result, count};
        } catch (error) {
            Logger.error(error.message, '', 'GetOrdersQuery');
        }
    }
}
