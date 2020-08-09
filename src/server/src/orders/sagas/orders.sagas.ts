import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderCreatedSuccessEvent } from 'orders/events/impl/order-created.event';
import { EventStore } from 'core/event-store/lib';
import { OrderToUpgradeCreatedSuccessEvent } from 'orders/events/impl/order-to-upgrade-created.event';
import { CreateOrderedTokenCommand } from '../../tokens/commands/impl/create-token.command';
import { UpgradeTokenCommand } from '../../tokens/commands/impl/upgrade-token.command';

@Injectable()
export class OrdersSagas {
    constructor(
        private readonly eventStore: EventStore
    ) {
    }

    @Saga()
    orderCreatedSuccess = (event$: Observable<any>): Observable<ICommand> => {
        return event$.pipe(
            ofType(OrderCreatedSuccessEvent),
            map((event: OrderCreatedSuccessEvent) => {
                Logger.log('Inside [OrdersSagas] orderCreatedSuccess Saga', 'OrdersSagas');
                const { streamId, tokenDto } = event;
                return new CreateOrderedTokenCommand(streamId, tokenDto);
                // tokenCreatedEvent['eventType'] = 'OrderedTokenCreatedEvent';
                // return new TokenCreatedEvent(streamId, tokenCreatedEvent);
                // this.eventStore.publish(tokenCreatedEvent, CONSTANTS.STREAM_NAME.TOKEN);
            })
        );
    };

    @Saga()
    orderToUpgradeCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(OrderToUpgradeCreatedSuccessEvent),
            map((event: OrderToUpgradeCreatedSuccessEvent) => {
                Logger.log('Inside [OrdersSagas] orderToUpgradeCreatedSuccess Saga', 'OrdersSagas');
                const { streamId, orderDto } = event;
                const { tokenType, token } = orderDto;
                token.orderId = orderDto._id;
                return new UpgradeTokenCommand(streamId, token, tokenType);
                // tokenUpgradedEvent['eventType'] = 'TokenUpgradedEvent';
                // this.eventStore.publish(tokenUpgradedEvent, CONSTANTS.STREAM_NAME.TOKEN);
            })
        );
    };
}