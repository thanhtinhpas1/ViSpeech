import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { OrderedTokenCreatedFailedEvent } from '../events/impl/ordered-token-created.event';
import { map } from 'rxjs/operators';
import { TokenTypeDto } from '../dtos/token-types.dto';
import { OrderDto } from '../../orders/dtos/orders.dto';
import { CONSTANTS } from '../../common/constant';
import { UpgradeTokenOrderCreatedSuccessEvent } from '../events/impl/upgrade-token-order-created.event';
import { UpgradeTokenCommand } from '../commands/impl/upgrade-token.command';
import { TokenUpgradedFailedEvent, TokenUpgradedSuccessEvent } from '../events/impl/token-upgraded.event';
import { OrderUpdatedEvent } from '../../orders/events/impl/order-updated.event';
import { EventStore } from '../../core/event-store/lib';
import { TokenDto } from '../dtos/tokens.dto';

@Injectable()
export class TokensSagas {
    constructor(
        private readonly eventStore: EventStore,
    ) {
    }

    @Saga()
    orderedTokenCreatedFailed = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(OrderedTokenCreatedFailedEvent),
            map((event: OrderedTokenCreatedFailedEvent) => {
                Logger.log('Inside [OrdersSagas] orderedTokenCreatedFailed Saga', 'OrdersSagas');
                const {streamId, tokenDto} = event;
                const {userId, orderId} = tokenDto;
                const tempTokenTypeDto = TokenTypeDto.createTempInstance();
                const orderDto = new OrderDto(userId, tempTokenTypeDto, tokenDto, CONSTANTS.STATUS.FAILURE);
                orderDto._id = orderId;
                this.sendOrderUpdatedEvent(userId, tempTokenTypeDto, tokenDto, orderId);
            })
        );
    };

    @Saga()
    upgradeTokenOrderCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UpgradeTokenOrderCreatedSuccessEvent),
            map((event: UpgradeTokenOrderCreatedSuccessEvent) => {
                Logger.log("Inside [OrdersSagas] upgradeTokenOrderCreatedSuccess Saga", "OrdersSagas");
                const {streamId, orderDto} = event;
                const {tokenType, token} = orderDto;
                token.orderId = orderDto._id
                return new UpgradeTokenCommand(streamId, token, tokenType);
            })
        );
    };

    @Saga()
    tokenUpgradedSuccess = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(TokenUpgradedSuccessEvent),
            map((event: TokenUpgradedSuccessEvent) => {
                Logger.log("Inside [OrdersSagas] tokenUpgradedSuccessEvent Saga", "OrdersSagas");
                const {streamId, tokenDto, tokenTypeDto} = event;
                const {userId, orderId} = tokenDto;
                const orderDto = new OrderDto(userId, tokenTypeDto, tokenDto, CONSTANTS.STATUS.SUCCESS);
                orderDto._id = orderId;
                this.sendOrderUpdatedEvent(userId, tokenTypeDto, tokenDto, orderId);
            })
        );
    };

    @Saga()
    tokenUpgradedFailed = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(TokenUpgradedFailedEvent),
            map((event: TokenUpgradedFailedEvent) => {
                Logger.log("Inside [OrdersSagas] tokenUpgradedFailedEvent Saga", "OrdersSagas");
                const {streamId, tokenDto, tokenTypeDto} = event;
                const {userId, orderId} = tokenDto;
                this.sendOrderUpdatedEvent(userId, tokenTypeDto, tokenDto, orderId);
            })
        );
    };

    private sendOrderUpdatedEvent(userId: any, tokenTypeDto: TokenTypeDto, tokenDto: TokenDto, orderId: any) {
        const orderDto = new OrderDto(userId, tokenTypeDto, tokenDto, CONSTANTS.STATUS.FAILURE);
        orderDto._id = orderId;
        const updateOrderEvent = new OrderUpdatedEvent(orderDto._id, orderDto);
        updateOrderEvent['eventType'] = 'OrderUpdatedEvent';
        this.eventStore.publish(updateOrderEvent, '$ce-order')
            .then(() => Logger.log('Sent OrderUpdatedEvent'));
    }
}
