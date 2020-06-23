import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { WelcomeOrderCommand } from '../impl/welcome-order.command';
import { OrderRepository } from '../../repository/order.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(WelcomeOrderCommand)
export class WelcomeOrderHandler
    implements ICommandHandler<WelcomeOrderCommand> {
    constructor(
        private readonly repository: OrderRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: WelcomeOrderCommand) {
        Logger.log('Async WelcomeOrderHandler...', 'WelcomeOrderCommand');
        const {streamId, orderId} = command;
        const order = this.publisher.mergeObjectContext(
            await this.repository.welcomeOrder(streamId, orderId)
        );
        order.commit();
    }
}
