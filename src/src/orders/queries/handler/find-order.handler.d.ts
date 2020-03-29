import { IQueryHandler } from '@nestjs/cqrs';
import { FindOrderQuery } from '../impl/find-order.query';
import { OrderDto } from 'orders/dtos/orders.dto';
import { Repository } from 'typeorm';
export declare class FindOrderHandler implements IQueryHandler<FindOrderQuery> {
    private readonly repository;
    constructor(repository: Repository<OrderDto>);
    execute(query: FindOrderQuery): Promise<any>;
}
