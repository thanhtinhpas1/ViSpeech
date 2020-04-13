import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersByUserIdQuery } from '../impl/get-orders-by-userId';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDto } from 'orders/dtos/orders.dto';

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
        const { userId, offset, limit } = query;
        let orders = [];
        try {
            const findOptions = { where: { userId } }
            orders = limit != null && offset != null ?
                await this.repository.find({ skip: offset, take: limit, ...findOptions }) :
                await this.repository.find(findOptions);
            const count = await this.repository.count(findOptions.where);
            return { data: orders, count };
        } catch (error) {
            Logger.error(error, '', 'GetOrdersByUserIdQuery');
        }
    }
}
