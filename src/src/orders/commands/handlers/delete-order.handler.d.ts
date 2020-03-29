import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteOrderCommand } from '../impl/delete-order.command';
import { OrderRepository } from '../../repository/order.repository';
export declare class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: OrderRepository, publisher: EventPublisher);
    execute(command: DeleteOrderCommand): Promise<void>;
}
