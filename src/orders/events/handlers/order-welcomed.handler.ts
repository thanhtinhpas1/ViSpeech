import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {OrderWelcomedEvent} from '../impl/order-welcomed.event';
import {Logger} from '@nestjs/common';

@EventsHandler(OrderWelcomedEvent)
export class OrderWelcomedHandler implements IEventHandler<OrderWelcomedEvent> {
    handle(event: OrderWelcomedEvent) {
        Logger.log(event, 'OrderWelcomedEvent'); // write here
    }
}
