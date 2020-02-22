import {Injectable, Logger} from '@nestjs/common';
import {ICommand, ofType, Saga} from '@nestjs/cqrs';
import {OrderCreatedEvent} from '../events/impl/order-created.event';
import {WelcomeOrderCommand} from '../commands/impl/welcome-order.command';
import {delay, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class OrdersSagas {
  @Saga()
  orderCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCreatedEvent),
      delay(1000),
      map(event => {
        Logger.log("Inside [OrdersSagas] Saga", "OrdersSagas");
        const orderId = event.orderDto[0].id;
        return new WelcomeOrderCommand(orderId);
      })
    );
  };
}
