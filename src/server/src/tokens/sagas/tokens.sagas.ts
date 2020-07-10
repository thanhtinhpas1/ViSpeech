import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONSTANTS } from '../../common/constant';
import { EventStore } from '../../core/event-store/lib';
import { OrderCreatedSuccessEvent } from '../../orders/events/impl/order-created.event';
import { OrderUpdatedStatusEvent } from '../../orders/events/impl/order-updated-status..event';
import { CreateOrderedTokenCommand } from '../commands/impl/create-token.command';
import { UpgradeTokenCommand } from '../commands/impl/upgrade-token.command';
import { OrderedTokenCreatedFailedEvent } from '../events/impl/ordered-token-created.event';
import { TokenUpgradedFailedEvent, TokenUpgradedSuccessEvent } from '../events/impl/token-upgraded.event';
import { UpgradeTokenOrderCreatedSuccessEvent } from '../events/impl/upgrade-token-order-created.event';

@Injectable()
export class TokensSagas {
    constructor(
        private readonly eventStore: EventStore,
    ) {
    }

    @Saga()
    orderedTokenCreated = (event$: Observable<any>): Observable<CreateOrderedTokenCommand> => {
        return event$.pipe(
            ofType(OrderCreatedSuccessEvent),
            map((event: OrderCreatedSuccessEvent) => {
                Logger.log('Inside [TokensSagas] OrderCreatedSuccessEvent Saga', 'TokensSagas');
                const { streamId, orderDto } = event;
                const token = orderDto.token;
                token.orderId = orderDto._id;
                token.tokenTypeId = orderDto.tokenType._id;
                return new CreateOrderedTokenCommand(streamId, token);
            })
        );
    }

    @Saga()
    orderedTokenCreatedFailed = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(OrderedTokenCreatedFailedEvent),
            map((event: OrderedTokenCreatedFailedEvent) => {
                Logger.log('Inside [OrdersSagas] orderedTokenCreatedFailed Saga', 'OrdersSagas');
                const {tokenDto} = event;
                const {orderId} = tokenDto;
                const updateStatus = new OrderUpdatedStatusEvent(orderId, orderId, CONSTANTS.STATUS.FAILURE);
                updateStatus['eventType'] = 'OrderUpdatedStatusEvent';
                this.eventStore.publish(updateStatus, '$ce-order')
                    .then(() => Logger.log('Sent OrderUpdatedStatusEvent'));
            })
        );
    };

    @Saga()
    upgradeTokenOrderCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UpgradeTokenOrderCreatedSuccessEvent),
            map((event: UpgradeTokenOrderCreatedSuccessEvent) => {
                Logger.log('Inside [OrdersSagas] upgradeTokenOrderCreatedSuccess Saga', 'OrdersSagas');
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
                Logger.log('Inside [OrdersSagas] tokenUpgradedSuccessEvent Saga', 'OrdersSagas');
                const {tokenDto} = event;
                const {orderId} = tokenDto;
                const updateStatus = new OrderUpdatedStatusEvent(orderId, orderId, CONSTANTS.STATUS.SUCCESS);
                updateStatus['eventType'] = 'OrderUpdatedStatusEvent';
                this.eventStore.publish(updateStatus, '$ce-order')
                    .then(() => Logger.log('Sent OrderUpdatedStatusEvent'));
            })
        );
    };

    @Saga()
    tokenUpgradedFailed = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(TokenUpgradedFailedEvent),
            map((event: TokenUpgradedFailedEvent) => {
                Logger.log('Inside [OrdersSagas] tokenUpgradedFailedEvent Saga', 'OrdersSagas');
                const {tokenDto} = event;
                const {orderId} = tokenDto;
                const updateStatus = new OrderUpdatedStatusEvent(orderId, orderId, CONSTANTS.STATUS.FAILURE);
                updateStatus['eventType'] = 'OrderUpdatedStatusEvent';
                this.eventStore.publish(updateStatus, '$ce-order')
                    .then(() => Logger.log('Sent OrderUpdatedStatusEvent'));
            })
        );
    };
}
