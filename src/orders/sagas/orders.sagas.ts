import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { OrderCreationStartedEvent, OrderCreatedSuccessEvent } from "../events/impl/order-created.event";
import { delay, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { CreateOrderCommand } from "orders/commands/impl/create-order.command";
import { AuthService } from "auth/auth.service";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { CreateOrderedTokenCommand } from "tokens/commands/impl/create-token.command";
import { UpdateOrderCommand } from "orders/commands/impl/update-order.command";
import { OrderDto } from "orders/dtos/orders.dto";
import { CONSTANTS } from "common/constant";
import { OrderedTokenCreatedSuccessEvent, OrderedTokenCreatedFailedEvent } from "tokens/events/impl/ordered-token-created.event";

@Injectable()
export class OrdersSagas {
  constructor(private readonly authService: AuthService) {}

  @Saga()
  startCreatingOrder = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCreationStartedEvent),
      delay(1000),
      map((event: OrderCreationStartedEvent) => {
        Logger.log("Inside [OrdersSagas] startCreatingOrder Saga", "OrdersSagas");
        const orderDto = event.orderDto;
        return new CreateOrderCommand(orderDto);
      })
    );
  };

  @Saga()
  orderCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCreatedSuccessEvent),
      map((event: OrderCreatedSuccessEvent) => {
        Logger.log("Inside [OrdersSagas] orderCreatedSuccess Saga", "OrdersSagas");
        const { userId, tokenTypeId, _id } = event.orderDto;
        const tokenValue = this.authService.generate_token_with_userId(userId);
        const tokenDto = new TokenDto(tokenValue, userId, null, tokenTypeId, _id);
        return new CreateOrderedTokenCommand(tokenDto);
      })
    );
  };

  @Saga()
  orderedTokenCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderedTokenCreatedSuccessEvent),
      delay(1000),
      map((event: OrderedTokenCreatedSuccessEvent) => {
        Logger.log("Inside [OrdersSagas] orderedTokenCreatedSuccess Saga", "OrdersSagas");
        const { _id, userId, tokenTypeId, orderId } = event.tokenDto;
        const orderDto = new OrderDto(userId, tokenTypeId, _id, CONSTANTS.STATUS.SUCCESS);
        orderDto._id = orderId;
        return new UpdateOrderCommand(orderDto);
      })
    );
  };

  @Saga()
  orderedTokenCreatedFail = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderedTokenCreatedFailedEvent),
      delay(1000),
      map((event: OrderedTokenCreatedFailedEvent) => {
        Logger.log("Inside [OrdersSagas] orderedTokenCreatedFail Saga", "OrdersSagas");
        const { _id, userId, tokenTypeId, orderId } = event.tokenDto;
        const orderDto = new OrderDto(userId, tokenTypeId, _id, CONSTANTS.STATUS.FAILURE);
        orderDto._id = orderId;
        return new UpdateOrderCommand(orderDto);
      })
    );
  };
}
