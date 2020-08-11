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
import { AuthService } from 'auth/auth.service';

import Stripe from 'stripe';
import { Utils } from 'utils';
import { PermissionDto, Permission } from 'permissions/dtos/permissions.dto';
import { CONSTANTS } from 'common/constant';

const stripe = new Stripe(config.STRIPE_SECRET_KEY, { apiVersion: '2020-03-02' });

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
    constructor(
        private readonly repository: OrderRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus,
        private readonly authService: AuthService
    ) {
    }

    async execute(command: CreateOrderCommand) {
        Logger.log('Async CreateOrderHandler...', 'CreateOrderCommand');
        const { streamId, orderDto, paymentIntent } = command;

        try {
            const paymentIntentObj = await stripe.paymentIntents.retrieve(paymentIntent.id);
            if (paymentIntentObj && paymentIntentObj.status === 'succeeded') {
                const user = await getMongoRepository(UserDto).findOne({ _id: orderDto.userId.toString() });
                if (!user) {
                    throw new NotFoundException(`User with _id ${orderDto.userId} does not exist.`);
                }

                const tokenTypeDto = await getMongoRepository(TokenTypeDto).findOne({ name: orderDto.tokenType.name });
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
                const isTokenNameExisted = projectTokens.findIndex(token => token.name === orderDto.token.name) > -1;
                if (isTokenNameExisted) {
                    throw new BadRequestException('Token name is existed.');
                }

                // create new ordered token
                const { userId, tokenType, _id, token } = orderDto;
                const tokenValue = this.authService.generateTokenWithUserId(userId);
                const tokenDto = new TokenDto(tokenValue, userId, token.projectId, tokenType.name, tokenType._id, _id, token.name);
                tokenDto._id = Utils.getUuid();

                // generate assigneeTokens to update permissions
                const assigneeTokens = [];
                const permissions = await getMongoRepository(PermissionDto).find({ projectId: validProject._id, assignerId: user._id,
                    status: CONSTANTS.STATUS.ACCEPTED });
                const assigneeIds = permissions.map(p => p.assigneeId);
                for (const assigneeId of assigneeIds) {
                    const assigneeToken = this.authService.generateAssigneeToken(user._id, validProject._id, assigneeId, tokenDto._id)
                    assigneeTokens.push(new Permission(assigneeId, tokenDto._id, assigneeToken));
                }

                // use mergeObjectContext for dto dispatch events
                const order = this.publisher.mergeObjectContext(
                    await this.repository.createOrder(streamId, orderDto, tokenDto, assigneeTokens)
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
            this.eventBus.publish(new OrderCreatedFailedEvent(streamId, orderDto, { message: errorMessage }));
        }
    }
}
