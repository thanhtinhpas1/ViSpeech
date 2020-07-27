import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { config } from '../../../../config';
import { getMongoRepository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { CreateOrderToUpgradeCommand } from '../impl/create-order-to-upgrade.command';
import { UserDto } from 'users/dtos/users.dto';
import { OrderToUpgradeCreatedFailedEvent } from 'orders/events/impl/order-to-upgrade-created.event';
import { CONSTANTS } from 'common/constant';
import { OrderRepository } from 'orders/repository/order.repository';

import Stripe from 'stripe';

const stripe = new Stripe(config.STRIPE_SECRET_KEY, { apiVersion: '2020-03-02' });

@CommandHandler(CreateOrderToUpgradeCommand)
export class CreateOrderToUpgradeHandler implements ICommandHandler<CreateOrderToUpgradeCommand> {
    constructor(
        private readonly repository: OrderRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: CreateOrderToUpgradeCommand) {
        Logger.log('Async CreateOrderToUpgradeHandler...', 'CreateOrderToUpgradeCommand');
        const { streamId, orderDto, paymentIntent } = command;

        try {
            const paymentIntentObj = await stripe.paymentIntents.retrieve(paymentIntent.id);
            if (paymentIntentObj && paymentIntentObj.status === 'succeeded') {
                const user = await getMongoRepository(UserDto).findOne({ _id: orderDto.userId.toString() });
                if (!user) {
                    throw new NotFoundException(`User with _id ${orderDto.userId} does not exist.`);
                }

                const upgradeToTokenType = orderDto.tokenType.name;
                if (upgradeToTokenType === CONSTANTS.TOKEN_TYPE.FREE) {
                    throw new BadRequestException(`Cannot upgrade token to free token.`);
                }
                const tokenTypeDto = await getMongoRepository(TokenTypeDto).findOne({ name: upgradeToTokenType });
                if (!tokenTypeDto) {
                    throw new NotFoundException(`Token type with name ${upgradeToTokenType} does not exist.`);
                }

                const validToken = await getMongoRepository(TokenDto).findOne({
                    _id: orderDto.token._id,
                    isValid: true,
                    userId: orderDto.userId
                });
                if (!validToken) {
                    throw new BadRequestException(`Token with _id ${orderDto.token._id} is not valid.`);
                }

                const freeTokenType = await getMongoRepository(TokenTypeDto).findOne({ name: CONSTANTS.TOKEN_TYPE.FREE });
                if (validToken.tokenTypeId === freeTokenType._id) {
                    throw new BadRequestException(`Cannot upgrade free token. Token id: ${orderDto.token._id}.`);
                }

                // use mergeObjectContext for dto dispatch events
                const order = this.publisher.mergeObjectContext(
                    await this.repository.createOrderToUpgrade(streamId, orderDto)
                );
                order.commit();
                return;
            }

            throw new BadRequestException(`Payment intent with id "${paymentIntent.id}" does not exist or payment intent status is not succeeded.`);
        } catch (error) {
            let errorMessage = error.errmsg || error.message;
            if (error.raw && error.raw.message) {
                errorMessage = error.raw.message;
            }
            this.eventBus.publish(new OrderToUpgradeCreatedFailedEvent(streamId, orderDto, { message: errorMessage }));
        }
    }
}
