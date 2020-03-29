import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { WelcomeOrderCommand } from '../impl/welcome-order.command';
import { OrderRepository } from '../../repository/order.repository';
export declare class WelcomeOrderHandler implements ICommandHandler<WelcomeOrderCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: OrderRepository, publisher: EventPublisher);
    execute(command: WelcomeOrderCommand): Promise<void>;
}
