import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'orders/dtos/orders.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { getMongoRepository, Repository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { Utils } from 'utils';
import { GetOrdersQuery } from '../impl/get-orders.query';
import { TokenDto } from 'tokens/dtos/tokens.dto';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
    constructor(
        @InjectRepository(OrderDto)
        private readonly repository: Repository<OrderDto>,
        @InjectRepository(UserDto)
        private readonly userDtoRepository: Repository<UserDto>,
        @InjectRepository(ProjectDto)
        private readonly projectDtoRepository: Repository<ProjectDto>,
        @InjectRepository(TokenDto)
        private readonly tokenDtoRepository: Repository<TokenDto>
    ) {
    }

    async execute(query: GetOrdersQuery) {
        Logger.log('Async GetOrdersQuery...', 'GetOrdersQuery');
        const { offset, limit, filters, sort, advancedFilters } = query;
        const result = [];
        try {
            const findOptions = {
                where: {},
                order: {}
            };
            if (advancedFilters) {
                if (advancedFilters['userIds']) {
                    findOptions.where['userId'] = { $in: [...advancedFilters['userIds']] };
                }
                if (advancedFilters['projectIds']) {
                    findOptions.where['token.projectId'] = { $in: [...advancedFilters['projectIds']] };
                }
                if (advancedFilters['tokenTypes']) {
                    findOptions.where['tokenType.name'] = { $in: [...advancedFilters['tokenTypes']] };
                }
                if (advancedFilters['statuses']) {
                    findOptions.where['status'] = { $in: [...advancedFilters['statuses']] };
                }
                if (advancedFilters['dates']) {
                    findOptions.where['createdDate'] = {
                        $gte: new Date(Number(advancedFilters['dates'].from)),
                        $lt: new Date(Number(advancedFilters['dates'].to)),
                    };
                }
            }
            if (filters) {
                if (filters['_id']) {
                    findOptions.where['_id'] = new RegExp(filters['_id'], 'i');
                }
                if (filters['status']) {
                    if (advancedFilters && advancedFilters['statuses']) {
                        const value = advancedFilters['statuses'].includes(filters['status']) ? filters['status'] : '';
                        findOptions.where['status'] = value;
                    } else {
                        findOptions.where['status'] = filters['status'];
                    }
                }
                if (filters['tokenType']) {
                    if (advancedFilters && advancedFilters['tokenTypes']) {
                        const value = advancedFilters['tokenTypes'].includes(filters['tokenType']) ? filters['tokenType'] : '';
                        findOptions.where['tokenType.name'] = value;
                    } else {
                        findOptions.where['tokenType.name'] = filters['tokenType'];
                    }
                }
                if (filters['username']) {
                    const users = await this.userDtoRepository.find({ where: { username: new RegExp(filters['username'], 'i') } });
                    if (users.length > 0) {
                        let userIds = users.map(user => user._id);
                        if (advancedFilters && advancedFilters['userIds']) {
                            userIds = userIds.filter(id => advancedFilters['userIds'].includes(id));
                        }
                        findOptions.where['userId'] = { $in: [...userIds] };
                    }
                }
                if (filters['projectName']) {
                    const projects = await this.projectDtoRepository.find({ where: { name: new RegExp(filters['projectName'], 'i') } });
                    if (projects.length > 0) {
                        let projectIds = projects.map(project => project._id);
                        if (advancedFilters && advancedFilters['projectIds']) {
                            projectIds = projectIds.filter(id => advancedFilters['projectIds'].includes(id));
                        }
                        findOptions.where['token.projectId'] = { $in: [...projectIds] };
                    }
                }
                if (filters['tokenName']) {
                    const tokens = await this.tokenDtoRepository.find({ where: { name: new RegExp(filters['tokenName'], 'i') } });
                    if (tokens.length > 0) {
                        const tokenIds = tokens.map(token => token._id);
                        findOptions.where['token._id'] = { $in: [...tokenIds] };
                    }
                }
            }
            if (sort) {
                const sortField = Utils.getCorrectSortField(sort.field);
                findOptions.order[sortField] = sort.order;
            }

            const orders = await this.repository.find({ skip: offset || 0, take: limit || 0, ...findOptions });
            for (const order of orders) {
                const user = await this.userDtoRepository.findOne({ _id: order.userId?.toString() });
                const project = await this.projectDtoRepository.findOne({ _id: order.token.projectId?.toString() });
                const token = await this.tokenDtoRepository.findOne({ _id: order.token._id?.toString() });
                result.push({ ...order, username: user?.username, projectName: project?.name, tokenName: token?.name });
            }

            const count = await getMongoRepository(OrderDto).count(findOptions.where);
            return { data: result, count };
        } catch (error) {
            Logger.error(error.message, '', 'GetOrdersQuery');
        }
    }
}
