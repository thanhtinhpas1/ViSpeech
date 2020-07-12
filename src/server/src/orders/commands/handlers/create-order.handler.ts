import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../impl/create-order.command';
import { OrderRepository } from '../../repository/order.repository';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { config } from '../../../../config';
import { OrderCreatedFailedEvent } from 'orders/events/impl/order-created.event';
import { getMongoRepository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { UserDto } from 'users/dtos/users.dto';

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

                const validProject = await getMongoRepository(ProjectDto).findOne({
                    _id: orderDto.token.projectId,
                    isValid: true
                });
                if (!validProject) {
                    throw new BadRequestException(`Project with _id ${orderDto.token.projectId} is not valid.`);
                }

                if (!orderDto.token.name) {
                    throw new BadRequestException('Token name is required.');
                }
                const projectTokens = await getMongoRepository(TokenDto).find({
                    where: {
                        userId: orderDto.userId,
                        projectId: orderDto.token.projectId
                    }
                });
                const isTokenNameExisted = projectTokens.findIndex(token => token.name === orderDto.token.name) > -1
                if (isTokenNameExisted) {
                    throw new BadRequestException('Token name is existed.')
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
            this.eventBus.publish(new OrderCreatedFailedEvent(streamId, orderDto, {message: errorMessage}));
        }
    }
}
