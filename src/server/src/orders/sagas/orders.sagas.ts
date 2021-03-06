import { Injectable, Logger } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderedTokenCreatedEvent } from 'tokens/events/impl/ordered-token-created.event';
import { TokenUpgradedEvent } from 'tokens/events/impl/token-upgraded.event';
import { OrderCreatedSuccessEvent } from 'orders/events/impl/order-created.event';
import { EventStore } from 'core/event-store/lib';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { OrderToUpgradeCreatedSuccessEvent } from 'orders/events/impl/order-to-upgrade-created.event';
import { CONSTANTS } from 'common/constant';

@Injectable()
export class OrdersSagas {
    constructor(
        private readonly eventStore: EventStore
    ) {
    }

    @Saga()
    orderCreatedSuccess = (event$: Observable<any>): Observable<void> => {
        return event$.pipe(
            ofType(OrderCreatedSuccessEvent),
            map((event: OrderCreatedSuccessEvent) => {
                Logger.log('Inside [OrdersSagas] orderCreatedSuccess Saga', 'OrdersSagas');
                const { streamId, tokenDto, assigneeTokens } = event;
                const tokenCreatedEvent = new OrderedTokenCreatedEvent(streamId, tokenDto, assigneeTokens);
                tokenCreatedEvent['eventType'] = 'OrderedTokenCreatedEvent';
                this.eventStore.publish(tokenCreatedEvent, CONSTANTS.STREAM_NAME.TOKEN);
            })
        );
    };

    @Saga()
    orderToUpgradeCreatedSuccess = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(OrderToUpgradeCreatedSuccessEvent),
            map((event: OrderToUpgradeCreatedSuccessEvent) => {
                Logger.log('Inside [OrdersSagas] orderToUpgradeCreatedSuccess Saga', 'OrdersSagas');
                const { streamId, orderDto } = event;
                const { tokenType, token } = orderDto;
                token.orderId = orderDto._id;
                const tokenUpgradedEvent = new TokenUpgradedEvent(streamId, token, tokenType);
                tokenUpgradedEvent['eventType'] = 'TokenUpgradedEvent';
                this.eventStore.publish(tokenUpgradedEvent, CONSTANTS.STREAM_NAME.TOKEN);
            })
        );
    };
}