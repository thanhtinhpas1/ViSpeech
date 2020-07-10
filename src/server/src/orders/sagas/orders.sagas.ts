import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { AuthService } from 'auth/auth.service';
import { CONSTANTS } from 'common/constant';
import { UpdateOrderCommand } from 'orders/commands/impl/update-order.command';
import { OrderDto } from 'orders/dtos/orders.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpgradeTokenCommand } from 'tokens/commands/impl/upgrade-token.command';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { OrderedTokenCreatedFailedEvent, OrderedTokenCreatedSuccessEvent } from 'tokens/events/impl/ordered-token-created.event';
import { TokenUpgradedFailedEvent, TokenUpgradedSuccessEvent } from 'tokens/events/impl/token-upgraded.event';
import { UpgradeTokenOrderCreatedSuccessEvent } from '../../tokens/events/impl/upgrade-token-order-created.event';

@Injectable()
export class OrdersSagas {
    constructor(private readonly authService: AuthService) {
    }

    @Saga()
    orderedTokenCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(OrderedTokenCreatedSuccessEvent),
            map((event: OrderedTokenCreatedSuccessEvent) => {
                Logger.log('Inside [OrdersSagas] orderedTokenCreatedSuccess Saga', 'OrdersSagas');
                const { streamId, tokenDto } = event;
                const { userId, orderId } = tokenDto;
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
                const { streamId, tokenDto } = event;
                const { userId, orderId } = tokenDto;
                const tempTokenTypeDto = TokenTypeDto.createTempInstance();
                const orderDto = new OrderDto(userId, tempTokenTypeDto, tokenDto, CONSTANTS.STATUS.FAILURE);
                orderDto._id = orderId;
                return new UpdateOrderCommand(streamId, orderDto);
            })
        );
    };

    @Saga()
    upgradeTokenOrderCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UpgradeTokenOrderCreatedSuccessEvent),
            map((event: UpgradeTokenOrderCreatedSuccessEvent) => {
                Logger.log('Inside [OrdersSagas] upgradeTokenOrderCreatedSuccess Saga', 'OrdersSagas');
                const { streamId, orderDto } = event;
                const { tokenType, token } = orderDto;
                token.orderId = orderDto._id;
                return new UpgradeTokenCommand(streamId, token, tokenType);
            })
        );
    };

    @Saga()
    tokenUpgradedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(TokenUpgradedSuccessEvent),
            map((event: TokenUpgradedSuccessEvent) => {
                Logger.log('Inside [OrdersSagas] tokenUpgradedSuccessEvent Saga', 'OrdersSagas');
                const { streamId, tokenDto, tokenTypeDto } = event;
                const { userId, orderId } = tokenDto;
                const orderDto = new OrderDto(userId, tokenTypeDto, tokenDto, CONSTANTS.STATUS.SUCCESS);
                orderDto._id = orderId;
                return new UpdateOrderCommand(streamId, orderDto);
            })
        );
    };

    @Saga()
    tokenUpgradedFailed = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(TokenUpgradedFailedEvent),
            map((event: TokenUpgradedFailedEvent) => {
                Logger.log('Inside [OrdersSagas] tokenUpgradedFailedEvent Saga', 'OrdersSagas');
                const { streamId, tokenDto, tokenTypeDto } = event;
                const { userId, orderId } = tokenDto;
                const orderDto = new OrderDto(userId, tokenTypeDto, tokenDto, CONSTANTS.STATUS.FAILURE);
                orderDto._id = orderId;
                return new UpdateOrderCommand(streamId, orderDto);
            })
        );
    };
}