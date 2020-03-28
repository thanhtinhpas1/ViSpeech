import {Injectable, Logger} from '@nestjs/common';
import {ICommand, ofType, Saga} from '@nestjs/cqrs';
import {OrderCreatedSuccessEvent, OrderCreationStartedEvent} from '../events/impl/order-created.event';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CreateOrderCommand} from 'orders/commands/impl/create-order.command';
import {AuthService} from 'auth/auth.service';
import {TokenDto} from 'tokens/dtos/tokens.dto';
import {CreateOrderedTokenCommand} from 'tokens/commands/impl/create-token.command';
import {UpdateOrderCommand} from 'orders/commands/impl/update-order.command';
import {OrderDto} from 'orders/dtos/orders.dto';
import {CONSTANTS} from 'common/constant';
import {OrderedTokenCreatedFailedEvent, OrderedTokenCreatedSuccessEvent} from 'tokens/events/impl/ordered-token-created.event';
import {TokenTypeDto} from 'tokens/dtos/token-types.dto';

@Injectable()
export class OrdersSagas {
    constructor(private readonly authService: AuthService) {
    }

    @Saga()
    startCreatingOrder = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(OrderCreationStartedEvent),
            map((event: OrderCreationStartedEvent) => {
                Logger.log('Inside [OrdersSagas] startCreatingOrder Saga', 'OrdersSagas');
                const {streamId, orderDto} = event;
                return new CreateOrderCommand(streamId, orderDto);
            })
        );
    };

    @Saga()
    orderCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(OrderCreatedSuccessEvent),
            map((event: OrderCreatedSuccessEvent) => {
                Logger.log('Inside [OrdersSagas] orderCreatedSuccess Saga', 'OrdersSagas');
                const {streamId, orderDto} = event;
                const {userId, tokenType, _id} = orderDto;
                const tokenValue = this.authService.generateTokenWithUserId(userId);
                const tokenDto = new TokenDto(tokenValue, userId, null, tokenType._id, _id);
                return new CreateOrderedTokenCommand(streamId, tokenDto);
            })
        );
    };

    @Saga()
    orderedTokenCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(OrderedTokenCreatedSuccessEvent),
            map((event: OrderedTokenCreatedSuccessEvent) => {
                Logger.log('Inside [OrdersSagas] orderedTokenCreatedSuccess Saga', 'OrdersSagas');
                const {streamId, tokenDto} = event;
                const {userId, orderId} = tokenDto;
                const tempTokenTypeDto = TokenTypeDto.createTempInstance();
                const orderDto = new OrderDto(userId, tempTokenTypeDto, tokenDto, CONSTANTS.STATUS.SUCCESS);
                orderDto._id = orderId;
                return new UpdateOrderCommand(streamId, orderDto);
            })
        );
    };

    @Saga()
    orderedTokenCreatedFailed = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(OrderedTokenCreatedFailedEvent),
            map((event: OrderedTokenCreatedFailedEvent) => {
                Logger.log('Inside [OrdersSagas] orderedTokenCreatedFailed Saga', 'OrdersSagas');
                const {streamId, tokenDto} = event;
                const {userId, orderId} = tokenDto;
                const tempTokenTypeDto = TokenTypeDto.createTempInstance();
                const orderDto = new OrderDto(userId, tempTokenTypeDto, tokenDto, CONSTANTS.STATUS.FAILURE);
                orderDto._id = orderId;
                return new UpdateOrderCommand(streamId, orderDto);
            })
        );
    };
}
