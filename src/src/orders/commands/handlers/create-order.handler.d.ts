import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand, CreateOrderStartCommand } from '../impl/create-order.command';
import { OrderRepository } from '../../repository/order.repository';
export declare class CreateOrderStartHandler implements ICommandHandler<CreateOrderStartCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: OrderRepository, publisher: EventPublisher);
    execute(command: CreateOrderStartCommand): Promise<void>;
}
export declare class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: OrderRepository, publisher: EventPublisher);
    execute(command: CreateOrderCommand): Promise<void>;
}
