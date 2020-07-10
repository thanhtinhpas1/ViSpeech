import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { AuthService } from 'auth/auth.service';
import { OrderDto } from 'orders/dtos/orders.dto';
import { OrderUpdatedEvent } from 'orders/events/impl/order-updated.event';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { CONSTANTS } from '../../common/constant';
import { EventStore } from '../../core/event-store/lib';
import { OrderCreatedSuccessEvent } from '../../orders/events/impl/order-created.event';
import { CreateOrderedTokenCommand } from '../commands/impl/create-token.command';
import { UpgradeTokenCommand } from '../commands/impl/upgrade-token.command';
import { OrderedTokenCreatedFailedEvent, OrderedTokenCreatedSuccessEvent } from '../events/impl/ordered-token-created.event';
import { TokenUpgradedFailedEvent, TokenUpgradedSuccessEvent } from '../events/impl/token-upgraded.event';
import { UpgradeTokenOrderCreatedSuccessEvent } from '../events/impl/upgrade-token-order-created.event';

@Injectable()
export class TokensSagas {
    constructor(
        private readonly eventStore: EventStore,
        private readonly authService: AuthService,
    ) {
    }

    @Saga()
    orderCreatedSuccess = (event$: Observable<any>): Observable<CreateOrderedTokenCommand> => {
        return event$.pipe(
            ofType(OrderCreatedSuccessEvent),
            map((event: OrderCreatedSuccessEvent) => {
                Logger.log('Inside [TokensSagas] OrderCreatedSuccessEvent Saga', 'TokensSagas');
                const { streamId, orderDto } = event;
                const { userId, tokenType, _id, token } = orderDto;
                const tokenValue = this.authService.generateTokenWithUserId(userId);
                const tokenDto = new TokenDto(tokenValue, userId, token.projectId, tokenType.name, tokenType._id, _id, token.name);
                return new CreateOrderedTokenCommand(streamId, tokenDto);
            })
        );
    };

    @Saga()
    orderedTokenCreatedSuccess = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(OrderedTokenCreatedSuccessEvent),
            map((event: OrderedTokenCreatedSuccessEvent) => {
                Logger.log('Inside [TokensSagas] OrderedTokenCreatedSuccessEvent Saga', 'TokensSagas');
                const { streamId, tokenDto } = event;
                const { userId, orderId } = tokenDto;
                const tempTokenTypeDto = TokenTypeDto.createTempInstance();
                const orderDto = new OrderDto(userId, tempTokenTypeDto, tokenDto, CONSTANTS.STATUS.SUCCESS);
                orderDto._id = orderId;
                this.publishOrderUpdatedEvent(streamId, orderDto);
            })
        );
    };

    @Saga()
    orderedTokenCreatedFailed = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(OrderedTokenCreatedFailedEvent),
            map((event: OrderedTokenCreatedFailedEvent) => {
                Logger.log('Inside [TokensSagas] orderedTokenCreatedFailed Saga', 'TokensSagas');
                const { streamId, tokenDto } = event;
                const { userId, orderId } = tokenDto;
                const tempTokenTypeDto = TokenTypeDto.createTempInstance();
                const orderDto = new OrderDto(userId, tempTokenTypeDto, tokenDto, CONSTANTS.STATUS.FAILURE);
                orderDto._id = orderId;
                this.publishOrderUpdatedEvent(streamId, orderDto);
            })
        );
    };

    @Saga()
    upgradeTokenOrderCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UpgradeTokenOrderCreatedSuccessEvent),
            map((event: UpgradeTokenOrderCreatedSuccessEvent) => {
                Logger.log('Inside [TokensSagas] upgradeTokenOrderCreatedSuccess Saga', 'TokensSagas');
                const { streamId, orderDto } = event;
                const { tokenType, token } = orderDto;
                token.orderId = orderDto._id;
                return new UpgradeTokenCommand(streamId, token, tokenType);
            })
        );
    };

    @Saga()
    tokenUpgradedSuccess = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(TokenUpgradedSuccessEvent),
            map((event: TokenUpgradedSuccessEvent) => {
                Logger.log('Inside [TokensSagas] tokenUpgradedSuccessEvent Saga', 'TokensSagas');
                const { streamId, tokenDto, tokenTypeDto } = event;
                const { userId, orderId } = tokenDto;
                const orderDto = new OrderDto(userId, tokenTypeDto, tokenDto, CONSTANTS.STATUS.SUCCESS);
                orderDto._id = orderId;
                this.publishOrderUpdatedEvent(streamId, orderDto);
            })
        );
    };

    @Saga()
    tokenUpgradedFailed = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(TokenUpgradedFailedEvent),
            map((event: TokenUpgradedFailedEvent) => {
                Logger.log('Inside [TokensSagas] tokenUpgradedFailedEvent Saga', 'TokensSagas');
                const { streamId, tokenDto, tokenTypeDto } = event;
                const { userId, orderId } = tokenDto;
                const orderDto = new OrderDto(userId, tokenTypeDto, tokenDto, CONSTANTS.STATUS.FAILURE);
                orderDto._id = orderId;
                this.publishOrderUpdatedEvent(streamId, orderDto);
            })
        );
    };

    publishOrderUpdatedEvent = (streamId, orderDto) => {
        const event = new OrderUpdatedEvent(streamId, orderDto);
        event['eventType'] = 'OrderUpdatedEvent';
        this.eventStore.publish(event, '$ce-order')
        .then(() => Logger.log('Sent OrderUpdatedEvent'));
    };
}
