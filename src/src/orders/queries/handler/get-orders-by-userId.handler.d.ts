import { IQueryHandler } from '@nestjs/cqrs';
import { GetOrdersByUserIdQuery } from '../impl/get-orders-by-userId';
import { Repository } from 'typeorm';
import { OrderDto } from 'orders/dtos/orders.dto';
export declare class GetOrdersByUserIdHandler implements IQueryHandler<GetOrdersByUserIdQuery> {
    private readonly repository;
    constructor(repository: Repository<OrderDto>);
    execute(query: GetOrdersByUserIdQuery): Promise<any>;
}
