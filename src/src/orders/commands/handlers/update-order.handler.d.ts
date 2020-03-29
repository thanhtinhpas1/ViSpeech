import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderCommand } from '../impl/update-order.command';
import { OrderRepository } from '../../repository/order.repository';
export declare class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: OrderRepository, publisher: EventPublisher);
    execute(command: UpdateOrderCommand): Promise<void>;
}
