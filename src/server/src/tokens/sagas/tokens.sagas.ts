import { Injectable, Logger } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { OrderDto } from 'orders/dtos/orders.dto';
import { OrderUpdatedEvent } from 'orders/events/impl/order-updated.event';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { CONSTANTS } from '../../common/constant';
import { EventStore } from '../../core/event-store/lib';
import { OrderedTokenCreatedFailedEvent, OrderedTokenCreatedSuccessEvent } from '../events/impl/ordered-token-created.event';
import { TokenUpgradedFailedEvent, TokenUpgradedSuccessEvent } from '../events/impl/token-upgraded.event';

@Injectable()
export class TokensSagas {
    constructor(
        private readonly eventStore: EventStore
    ) {
    }

    @Saga()
    orderedTokenCreatedSuccess = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(OrderedTokenCreatedSuccessEvent),
            map((event: OrderedTokenCreatedSuccessEvent) => {
                Logger.log('Inside [TokensSagas] orderedTokenCreatedSuccess Saga', 'TokensSagas');
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
    tokenUpgradedSuccess = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(TokenUpgradedSuccessEvent),
            map((event: TokenUpgradedSuccessEvent) => {
                Logger.log('Inside [TokensSagas] tokenUpgradedSuccess Saga', 'TokensSagas');
                const { streamId, tokenDto, tokenTypeDto } = event;
                const { userId, orderId } = tokenDto;
                const orderDto = new OrderDto(userId, tokenTypeDto, tokenDto, CONSTANTS.STATUS.SUCCESS, true);
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
                Logger.log('Inside [TokensSagas] tokenUpgradedFailed Saga', 'TokensSagas');
                const { streamId, tokenDto, tokenTypeDto } = event;
                const { userId, orderId } = tokenDto;
                const orderDto = new OrderDto(userId, tokenTypeDto, tokenDto, CONSTANTS.STATUS.FAILURE, true);
                orderDto._id = orderId;
                this.publishOrderUpdatedEvent(streamId, orderDto);
            })
        );
    };

    publishOrderUpdatedEvent = (streamId, orderDto) => {
        const event = new OrderUpdatedEvent(streamId, orderDto);
        event['eventType'] = 'OrderUpdatedEvent';
        this.eventStore.publish(event, CONSTANTS.STREAM_NAME.ORDER);
    };
}
