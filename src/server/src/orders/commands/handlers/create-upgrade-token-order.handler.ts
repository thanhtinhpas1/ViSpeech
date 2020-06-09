
import { CommandHandler, EventPublisher, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { OrderRepository } from '../../repository/order.repository';
import { Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { config } from '../../../../config';
import { getMongoRepository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { CreateUpgradeTokenOrderCommand } from '../impl/create-upgrade-token-order.command';
import { UserDto } from 'users/dtos/users.dto';
import { UpgradeTokenOrderCreatedFailedEvent } from 'orders/events/impl/upgrade-token-order-created.event';

const stripe = require('stripe')(config.STRIPE_SECRET_KEY);

@CommandHandler(CreateUpgradeTokenOrderCommand)
export class CreateUpgradeTokenOrderHandler implements ICommandHandler<CreateUpgradeTokenOrderCommand> {
    constructor(
        private readonly repository: OrderRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: CreateUpgradeTokenOrderCommand) {
        Logger.log('Async CreateOrderHandler...', 'CreateUpgradeTokenOrderCommand');
        const { streamId, orderDto, paymentIntent } = command;

        try {
            const paymentIntentObj = await stripe.paymentIntents.retrieve(paymentIntent.id);
            if (paymentIntentObj && paymentIntentObj.status === 'succeeded') {
                const user = await getMongoRepository(UserDto).findOne({ _id: orderDto.userId.toString() });
                if (!user) {
                    throw new NotFoundException(`User with _id ${orderDto.userId} does not exist.`);
                }

                const tokenTypeDto = await getMongoRepository(TokenTypeDto).findOne({ _id: orderDto.tokenType._id });
                if (!tokenTypeDto) {
                    throw new NotFoundException(`Token type with _id ${orderDto.tokenType._id} does not exist.`);
                }

                const validToken = await getMongoRepository(TokenDto).findOne({ _id: orderDto.token._id, isValid: true, userId: orderDto.userId });
                if (!validToken) {
                    throw new BadRequestException(`Token with _id ${orderDto.token._id} is not valid.`);
                }

                // use mergeObjectContext for dto dispatch events
                const order = this.publisher.mergeObjectContext(
                    await this.repository.createUpgradeTokenOrder(streamId, orderDto)
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
            this.eventBus.publish(new UpgradeTokenOrderCreatedFailedEvent(streamId, orderDto, { message: errorMessage }));
        }
    }
}
