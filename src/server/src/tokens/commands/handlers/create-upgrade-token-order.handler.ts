import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { config } from '../../../../config';
import { getMongoRepository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { CreateUpgradeTokenOrderCommand } from '../impl/create-upgrade-token-order.command';
import { UserDto } from 'users/dtos/users.dto';
import { UpgradeTokenOrderCreatedFailedEvent } from 'tokens/events/impl/upgrade-token-order-created.event';
import { CONSTANTS } from 'common/constant';
import { TokenRepository } from '../../repository/token.repository';

const stripe = require('stripe')(config.STRIPE_SECRET_KEY);

@CommandHandler(CreateUpgradeTokenOrderCommand)
export class CreateUpgradeTokenOrderHandler implements ICommandHandler<CreateUpgradeTokenOrderCommand> {
    constructor(
        private readonly repository: TokenRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: CreateUpgradeTokenOrderCommand) {
        Logger.log('Async CreateOrderHandler...', 'CreateUpgradeTokenOrderCommand');
        const {streamId, orderDto, paymentIntent} = command;

        try {
            const paymentIntentObj = await stripe.paymentIntents.retrieve(paymentIntent.id);
            if (paymentIntentObj && paymentIntentObj.status === 'succeeded') {
                const user = await getMongoRepository(UserDto).findOne({_id: orderDto.userId.toString()});
                if (!user) {
                    throw new NotFoundException(`User with _id ${orderDto.userId} does not exist.`);
                }

                const tokenTypeDto = await getMongoRepository(TokenTypeDto).findOne({name: orderDto.tokenType.name});
                if (!tokenTypeDto) {
                    throw new NotFoundException(`Token type with name ${orderDto.tokenType.name} does not exist.`);
                }

                const validToken = await getMongoRepository(TokenDto).findOne({
                    _id: orderDto.token._id,
                    isValid: true,
                    userId: orderDto.userId
                });
                if (!validToken) {
                    throw new BadRequestException(`Token with _id ${orderDto.token._id} is not valid.`);
                }

                const freeTokenType = await getMongoRepository(TokenTypeDto).findOne({name: CONSTANTS.TOKEN_TYPE.FREE});
                if (validToken.tokenTypeId === freeTokenType._id) {
                    throw new BadRequestException(`Cannot upgrade free token. Token id: ${orderDto.token._id}.`);
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
            this.eventBus.publish(new UpgradeTokenOrderCreatedFailedEvent(streamId, orderDto, {message: errorMessage}));
        }
    }
}
