import { Injectable, Logger } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { OrderCreatedSuccessEvent } from '../events/impl/order-created.event';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'auth/auth.service';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { OrderedTokenCreatedEvent } from 'tokens/events/impl/ordered-token-created.event';
import { EventStore } from '../../core/event-store/lib';

@Injectable()
export class OrdersSagas {
    constructor(
        private readonly authService: AuthService,
        private readonly eventStore: EventStore,
    ) {
    }

    @Saga()
    orderCreatedSuccess = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(OrderCreatedSuccessEvent),
            map((event: OrderCreatedSuccessEvent) => {
                Logger.log("Inside [OrdersSagas] orderCreatedSuccess Saga", "OrdersSagas");
                const {streamId, orderDto} = event;
                const {userId, tokenType, _id, token} = orderDto;
                const tokenValue = this.authService.generateTokenWithUserId(userId);
                const tokenDto = new TokenDto(tokenValue, userId, token.projectId, tokenType.name, tokenType._id, _id, token.name);
                // send event to token modules to create token for order
                const createTokenEvent = new OrderedTokenCreatedEvent(streamId, tokenDto);
                createTokenEvent['eventType'] = 'OrderedTokenCreatedEvent';
                this.eventStore.publish(createTokenEvent, '$ce-token')
                    .then(() => {
                        Logger.log('Sent OrderedTokenCreatedEvent.');
                    })
                ;
            })
        );
    };
}
