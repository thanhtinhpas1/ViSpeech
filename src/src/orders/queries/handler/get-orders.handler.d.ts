import { GetOrdersQuery } from '../impl/get-orders.query';
import { IQueryHandler } from '@nestjs/cqrs';
import { OrderDto } from 'orders/dtos/orders.dto';
import { Repository } from 'typeorm';
export declare class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
    private readonly repository;
    constructor(repository: Repository<OrderDto>);
    execute(query: GetOrdersQuery): Promise<OrderDto[]>;
}
