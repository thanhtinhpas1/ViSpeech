import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersByUserIdQuery } from '../impl/get-orders-by-userId';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getMongoRepository, Repository } from 'typeorm';
import { OrderDto } from 'orders/dtos/orders.dto';
import { Utils } from 'utils';

@QueryHandler(GetOrdersByUserIdQuery)
export class GetOrdersByUserIdHandler
    implements IQueryHandler<GetOrdersByUserIdQuery> {
    constructor(
        @InjectRepository(OrderDto)
        private readonly repository: Repository<OrderDto>
    ) {
    }

    async execute(query: GetOrdersByUserIdQuery): Promise<any> {
        Logger.log('Async GetOrdersByUserIdQuery...', 'GetOrdersByUserIdQuery');
        const {userId, offset, limit, filters, sort} = query;
        let orders = [];
        try {
            const findOptions = {
                where: {userId},
                order: {}
            }
            if (filters) {
                if (filters['status']) {
                    findOptions.where['status'] = filters['status']
                }
                if (filters['tokenType']) {
                    findOptions.where['tokenType.name'] = filters['tokenType']
                }
                if (filters['tokenName']) {
                    findOptions.where['token.name'] = filters['tokenName']
                }
            }
            if (sort) {
                const sortField = Utils.getCorrectSortField(sort.field)
                findOptions.order[sortField] = sort.order
            }

            orders = await this.repository.find({skip: offset || 0, take: limit || 0, ...findOptions});
            const count = await getMongoRepository(OrderDto).count(findOptions.where);
            return {data: orders, count};
        } catch (error) {
            Logger.error(error.message, '', 'GetOrdersByUserIdQuery');
        }
    }
}
