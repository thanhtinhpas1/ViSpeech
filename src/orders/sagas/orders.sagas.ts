import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { AuthService } from "auth/auth.service";
import { CONSTANTS } from "common/constant";
import { CreateOrderCommand } from "orders/commands/impl/create-order.command";
import { UpdateOrderCommand } from "orders/commands/impl/update-order.command";
import { OrderDto } from "orders/dtos/orders.dto";
import { Observable } from "rxjs";
import { delay, map } from "rxjs/operators";
import { CreateTokenCommand } from "tokens/commands/impl/create-token.command";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { TokenCreatedEvent } from "tokens/events/impl/token-created.event";
import { OrderCreatedEvent, OrderCreationStartedEvent } from "../events/impl/order-created.event";

@Injectable()
export class OrdersSagas {
  constructor(private readonly authService: AuthService) { }

  @Saga()
  startCreatingOrder = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCreationStartedEvent),
      delay(1000),
      map((event: OrderCreationStartedEvent) => {
        Logger.log("Inside [OrdersSagas] startCreatingOrder Saga", "OrdersSagas");
        const orderDto = event.orderDto;
        const transactionId = event.transactionId;
        return new CreateOrderCommand(transactionId, orderDto);
      })
    );
  };

  @Saga()
  orderCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCreatedEvent),
      map((event: OrderCreatedEvent) => {
        Logger.log("Inside [OrdersSagas] orderCreated Saga", "OrdersSagas");
        const transactionId = event.transactionId;
        const { userId, tokenTypeId, _id } = event.orderDto;
        const tokenValue = this.authService.generate_token_with_userId(userId);
        const tokenDto = new TokenDto(tokenValue, userId, null, tokenTypeId, _id);
        return new CreateTokenCommand(transactionId, tokenDto);
      })
    );
  };

  @Saga()
  tokenCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TokenCreatedEvent),
      map((event: TokenCreatedEvent) => {
        if (event.tokenDto.tokenType === CONSTANTS.TOKEN_TYPE.FREE) 

        Logger.log("Inside [OrdersSagas] tokenCreated Saga", "OrdersSagas");
        const transactionId = event.transactionId;
        const { _id, userId, tokenTypeId, orderId } = event.tokenDto;
        const orderDto = new OrderDto(userId, tokenTypeId, _id, CONSTANTS.STATUS.SUCCESS);
        orderDto._id = orderId;
        return new UpdateOrderCommand(transactionId, orderDto);
      })
    );
  };

  // @Saga()
  // tokenCreatedFail = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(TokenCreatedFailEvent),
  //     delay(1000),
  //     map((event: TokenCreatedFailEvent) => {
  //       Logger.log("Inside [OrdersSagas] tokenCreatedFail Saga", "OrdersSagas");
  //       const transactionId = event.transactionId;
  //       const { _id, userId, tokenTypeId, orderId } = event.tokenDto;
  //       const orderDto = new OrderDto(userId, tokenTypeId, _id, CONSTANTS.STATUS.FAILURE);
  //       orderDto._id = orderId;
  //       return new UpdateOrderCommand(transactionId, orderDto);
  //     })
  //   );
  // };
}
