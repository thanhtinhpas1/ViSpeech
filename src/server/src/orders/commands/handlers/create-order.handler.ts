import { CommandHandler, EventPublisher, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../impl/create-order.command';
import { OrderRepository } from '../../repository/order.repository';
import { Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { config } from '../../../../config';
import { OrderCreatedFailedEvent } from 'orders/events/impl/order-created.event';
import { getMongoRepository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';

const stripe = require('stripe')(config.STRIPE_SECRET_KEY);

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
    constructor(
        private readonly repository: OrderRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: CreateOrderCommand) {
        Logger.log('Async CreateOrderHandler...', 'CreateOrderCommand');
        const { streamId, orderDto, paymentIntent } = command;

        try {
            const paymentIntentObj = await stripe.paymentIntents.retrieve(paymentIntent.id);
            if (paymentIntentObj && paymentIntentObj.status === 'succeeded') {
                const tokenTypeDto = await getMongoRepository(TokenTypeDto).findOne({ _id: orderDto.tokenType._id });
                if (!tokenTypeDto) {
                    throw new NotFoundException(`Token type with _id ${orderDto.tokenType._id} does not exist.`);
                }

                const validProject = await getMongoRepository(ProjectDto).findOne({ _id: orderDto.token.projectId, isValid: true });
                if (!validProject) {
                    throw new NotFoundException(`Project with _id ${orderDto.token.projectId} is not valid.`);
                }

                // use mergeObjectContext for dto dispatch events
                const order = this.publisher.mergeObjectContext(
                    await this.repository.createOrder(streamId, orderDto)
                );
                order.commit();
                return
            }

            throw new BadRequestException(`Payment intent with id "${paymentIntent.id}" does not exist or payment intent status is not succeeded.`);
        } catch (error) {
            let errorMessage = error.errmsg || error.message;
            if (error.raw && error.raw.message) {
                errorMessage = error.raw.message;
            }
            this.eventBus.publish(new OrderCreatedFailedEvent(streamId, orderDto, { message: errorMessage }));
        }
    }
}
