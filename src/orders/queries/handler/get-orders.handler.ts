import {GetOrdersQuery} from '../impl/get-orders.query';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {OrderDto} from 'orders/dtos/orders.dto';
import {Repository} from 'typeorm';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
    constructor(
        @InjectRepository(OrderDto)
        private readonly repository: Repository<OrderDto>
    ) {
    }

    async execute(query: GetOrdersQuery) {
        Logger.log('Async GetOrdersQuery...', 'GetOrdersQuery');
        const {offset, limit} = query;
        try {
            if (limit && offset) {
                return await this.repository.find({
                    skip: offset,
                    take: limit,
                });
            }
            return await this.repository.find();
        } catch (error) {
            Logger.error(error, '', 'GetOrdersQuery');
        }
    }
}
